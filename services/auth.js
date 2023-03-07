const axios = require('axios');   
const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const app = express();

app.use(session({secret: 'GREPETINTOMANGUYA', resave: true, saveUninitialized: true}));

const login =async(username,password,req,res)=>{
    const user = await axios.post("https://shape-api.tupailabs.com/api/login",
        {
            "username" : username,
            "password" : password
        });
    if(user){
        if(!user.data.error){
            var decoded = jwt.verify(user.data.token, 'nMxSMng0kZOFiomhFkH4z0QghBjbWPvgipBcM8UdfwpsQNwRKX3OW8FlapKEMdAN');

            // store.set('user', { name: decoded.name, username: decoded.username, user_id: decoded.user_id, token: user.data.token  });
            req.session.username = decoded.username;
            req.session.userToken = user.data.token;

            res.redirect('/');
        }
    }
}

module.exports={login};