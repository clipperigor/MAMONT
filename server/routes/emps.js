var express = require('express');
var router = express.Router();

const pool=require("../modules/db");
const sql=`SELECT * from scott.emp where deptno=$1 order by ename
        `;
//Передача рараметра через URL-Path /emps/10
router.get('/:deptno',  (req, res, next)=> {
    res.setHeader("Content-Type", "application/json");
    const deptno=req.params.deptno;
    //--------------------------------------------
    //Использование Promise
    //---------------------------
    pool.connect()
        .then(client => {
            client.query(sql, [deptno])
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
