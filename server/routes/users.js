var express = require('express');
var router = express.Router();

const pool=require("../modules/db");
const SQL_AUTH=`SELECT id, trim(fn) fn, 
           trim(ln) ln , trim(email) email, trim(token) token 
           from homelib.users where email=$1
         and password = $2
       `;
const SQL_INSERT_USER=`INSERT INTO homelib.users (fn, ln, email, password, token)
            VALUES($1,$2,$3,$4,$5)`;

router.post('/register', async (req, res, next) => {

    res.setHeader("Content-Type", "application/json");
    const user=req.body;
    console.log("-----------------", "register------", user);
     pool.connect()
        .then(client=>{
            client.query(SQL_INSERT_USER, [user.firstName, user.lastName, user.email, user.password, 'new token JWT'])
                .then(data=>{
                    //Освобождаем соединение, возвращаем в pool
                    console.log("Inserting "+JSON.stringify(user));
                    client.release();
                    // Вновь добавленого пользователя возвращаем клиенту
                    res.send(user);
                })
                .catch(err=>{
                    //Освобождаем соединение, возвращаем в pool
                    console.error("====Error====",user ,err);
                    client.release();
                    res.send({error:err.toString()});
                })
        })
        .catch(err=>{
            res.send({error:"Ошибка Соединения: "+err.toString()});
        })
});

router.post('/', async (req, res, next) => {
    //console.log("-----------------", "authenticate");
    res.setHeader("Content-Type", "application/json");
    const email=req.body.email;
    const password=req.body.password;
    pool.connect()
        .then(client=>{
            client.query(SQL_AUTH, [email,password])
                .then(data=>{
                    //Освобождаем соединение, возвращаем в pool
                    client.release();
                    res.send(data.rows[0]);
                    // console.log(">>>>>",email,password );
                })
                .catch(err=>{
                    //Освобождаем соединение, возвращаем в pool
                    client.release();
                    res.send({error:"Ошибка SQL: "+err.toString()});
                })
        })
        .catch(err=>{
            res.send({error:"Ошибка Соединения: "+err.toString()});
        })

});

module.exports = router;
