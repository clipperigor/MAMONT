'use strict';
const axios=require('axios');
//POST запрос с авторизацией
//axios.post('http://192.168.113.133/mamont/dml',
axios.post('http://127.0.0.1:3000/dml',
    {action:'delete' ,emp:{empno:"7788"}},{auth:{username:"a", password:"Mironchik1"}})
     .then(res=>console.log(res.data)).catch(err=>console.log(err));