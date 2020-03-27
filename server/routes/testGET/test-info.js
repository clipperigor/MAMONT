'use strict';
const axios=require('axios');
//get запрос
axios.get('http://192.168.56.200/node/info')
    .then(res=>console.log(res.data)).catch(err=>console.log(err));