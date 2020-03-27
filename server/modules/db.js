'use strict';
var { Pool, Client } = require('pg')

// var pool = new Pool({
//     user: 'mamont',
//     host: '192.168.74.100',
//     database: 'mamont',
//     password: 'Mironchik1',
//     port: 5432,
//         idleTimeoutMillis: 5000,//Время простоя соединения
//     connectionTimeoutMillis: 2000,//Время ожидания клиентом подключения
// });
// const pool = new Pool({
//     user: 'igor',
//     host: '192.168.113.100',
//     database: 'mironchik.com',
//     password: 'Mironchik1',
//     port: 5432,
// });
// const pool = new Pool({
//     user: 'scott',
//     host: '192.168.113.200',
//     database: 'test',
//     password: 'tiger',
//     port: 5432,
//     max: 5, //Число клиентов, работающих в пуле
//     idleTimeoutMillis: 5000,//Время простоя соединения
//     connectionTimeoutMillis: 2000,//Время ожидания клиентом подключения
// });
const pool = new Pool({
    user: 'pg',
    host: '127.0.0.1',
    database: 'home.lib',
    password: 'Mironchik1',
    port: 5432,
    max: 5, //Число клиентов, работающих в пуле
    idleTimeoutMillis: 5000,//Время простоя соединения
    connectionTimeoutMillis: 2000,//Время ожидания клиентом подключения
});
//---------------------------------------------
//Определяем события в пуле соединения с DB
pool.on("connect",client=>{
    console.log("client подключился к DB...");})
pool.on("remove",client=>{
    console.log(`Соединение с сервером разорвано спустя idleTimeoutMillis...`);})
module.exports=pool;
