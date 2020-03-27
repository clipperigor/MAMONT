var express = require('express');
var router = express.Router();

const pool=require("../modules/db");
const sql=`SELECT NOW()as now,
        session_user as user,
        version() as version,
        inet_server_addr() as address,
        current_database() as database,
        current_catalog as catalog
        `;
router.get('/',  (req, res, next)=> {
  res.setHeader("Content-Type","application/json");
  //-------------------------------------
  //Использование обратного вызова callback
  //------------------------------------------
  // pool.connect((err, client, done) => {
  //   if (err) {
  //     throw err;
  //   }
  //   client.query(sql, [], (err, data) => {
  //     done()
  //     if (err) {
  //       console.log(err.stack);
  //       res.send({"Ошибка":err.toString()});
  //     } else {
  //       res.send(data.rows[0])
  //     }
  //   })
  //  })
  //--------------------------------------------
  //Использование Promise
  //---------------------------
  pool.connect()
      .then(client=>{
        client.query(sql, [])
            .then(data=>{
              //Освобождаем соединение, возвращаем в pool
              client.release();
              res.send(data.rows[0]);
             //console.log(">>>>>", new Date());
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
  //------------------------
  //Использование async/await
  //--------------------------
  // ;(async () => {
  //   const client = await pool.connect();
  //   try {
  //     const data = await client.query(sql, []);
  //     res.send(data.rows[0]);
  //   } finally {
  //     // Освобождаем соединение
  //     client.release();
  //   }
  // })().catch(err => res.send({"Ошибка":err.toString()}))
  //-----------------------------------
});

module.exports = router;
