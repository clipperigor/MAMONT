var express = require('express');
var router = express.Router();

const pool=require("../modules/db");
const sql=`SELECT * from scott.emp where empno=$1 
        `;
//Передача рараметра через тело запроса
    router.post('/',  (req, res, next)=> {
    res.setHeader("Content-Type", "application/json");
    const empno=req.body.empno;
    //--------------------------------------------
    //Использование Promise
    //---------------------------
    pool.connect()
        .then(client => {
            client.query(sql, [empno])
                .then(data => {
                    //Освобождаем соединение, возвращаем в pool
                    client.release();
                    if (data.rows.length!=1){
                        res.send({"error":"Данных не найдено!"})
                    }else {
                        res.send(data.rows[0])
                    }
                })
                .catch(err => {
                    //Освобождаем соединение, возвращаем в pool
                    client.release();
                    res.send({"Ошибка SQL": err.toString()});
                })
        })
        .catch(err => {
            res.send({"Ошибка Соединения": err.toString()});
        })
});

module.exports = router;
