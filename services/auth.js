const axios = require('axios');   
const jwt = require('jsonwebtoken');
var store = require('store'); 

const login =async(username,password,req,res)=>{
    const user = await axios.post("https://shape-api.tupailabs.com/api/login",
        {
            "username" : username,
            "password" : password
        });
    if(user){
        if(!user.data.error){
            var decoded = jwt.verify(user.data.token, 'nMxSMng0kZOFiomhFkH4z0QghBjbWPvgipBcM8UdfwpsQNwRKX3OW8FlapKEMdAN');

            store.set('user', { name: decoded.name, username: decoded.username, user_id: decoded.user_id, token: user.data.token  });
            res.redirect('/');
        }
    }
}

module.exports={login};