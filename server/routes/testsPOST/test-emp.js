'use strict';
const axios=require('axios');
//POST запрос с авторизацией
axios.post('http://192.168.113.133/mamont/emp',{empno:"7788"},
    {auth:{username:"a", password:"Mironchik1"}})
    .then(res=>console.log(res.data)).catch(err=>console.log(err));