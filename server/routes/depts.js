var express = require('express');
var router = express.Router();

const pool=require("../modules/db");
const sql=`SELECT * from scott.dept order by dname
        `;
router.get('/',  (req, res, next)=> {
    res.setHeader("Content-Type", "application/json");

    //--------------------------------------------
    //Использование Promise
    //---------------------------
    pool.connect()
        .then(client => {
            client.query(sql, [])
                .then(data => {
                    //Освобождаем соединение, возвращаем в pool
                    client.release();
                    res.send(data.rows)
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
