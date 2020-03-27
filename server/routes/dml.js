var express = require('express');
var router = express.Router();

const pool=require("../modules/db");
//Передача параметра через тело запроса
    router.post('/', async  (req, res, next)=> {
        res.setHeader("Content-Type", "application/json");
        const client=await pool.connect();
        const action=req.body.action;
        try {
            if(action==="delete") {
                await client.query("BEGIN");
                const cursor = await client.query("delete from scott.emp where empno=$1",
                    [req.body.emp.empno]);
                //console.dir(cursor);
                await client.query("COMMIT");
                //await client.query("ROLLBACK");
                res.send({ok: cursor.rowCount});
            }else if(action==="insert") {
                console.log('inserting...');
                await client.query("BEGIN");
                const cursor = await client.query(`insert into emp (empno, ename,job,sal, deptno)
                        values($1, $2,$3,$4, $5)`,
                    [
                        req.body.emp.empno,
                        req.body.emp.ename,
                        req.body.emp.job,
                        req.body.emp.sal,
                        req.body.emp.deptno
                    ]);
                //console.dir(cursor);
                await client.query("COMMIT");
                //await client.query("ROLLBACK");
                res.send({ok: cursor.rowCount});
            }else  if(action==="update") {
                console.log('updating...');
                await client.query("BEGIN");
                const cursor = await client.query(`update emp set ename=$1,job=$2,sal=$3 
                        where empno=$4` ,
                    [
                        req.body.emp.ename,
                        req.body.emp.job,
                        req.body.emp.sal,
                        req.body.emp.empno
                    ]);
                //console.dir(cursor);
                await client.query("COMMIT");
                //await client.query("ROLLBACK");
                res.send({ok: cursor.rowCount});
            }
        }catch (e) {
            await client.query("ROLLBACK");
            res.send({error:e.toString()});
        }finally {
            console.log('release...')
            client.release();
        }
    });

module.exports = router;
