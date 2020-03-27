'use strict';
const axios = require('axios');
//POST запрос
axios.post('http://192.168.56.200/node/users/register',
    { firstName: "wwww", lastName: "ssss", email: "clipperigor@yandex.ru", password: "Mironchik1" })
    .then(r => {
        if(!r.data.hasOwnProperty('fn')){
            throw new Error("Not Auth");
        }else{
            console.log(r.data);
        };
        })
    // )
    // .then(r => JSON.stringify(r.data))
    // .then(r => console.log(r))
     .catch(err => console.log(err));