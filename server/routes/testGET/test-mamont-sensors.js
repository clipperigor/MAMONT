'use strict';
const axios=require('axios');
//get запрос
axios.get('http://192.168.56.200/node/mamontsensors')
    .then(res=>console.log(res.data)).catch(err=>console.log(err));
