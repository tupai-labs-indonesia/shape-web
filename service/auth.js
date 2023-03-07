const axios = require('axios');    

const login =async(username,password,req,res)=>{
    const user = await axios.post("https://shape-api.tupailabs.com/api/login",
        {
            "username" : username,
            "password" : password
        });
    if(user){
        if(!user.data.error){
            res.redirect('/');
        }
    }
}

module.exports={login};