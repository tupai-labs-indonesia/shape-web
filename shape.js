const http = require('http');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const store = require('store');
const jwt = require('jsonwebtoken');
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const {login} = require('./services/auth');
app.use(session({secret: 'GREPETINTOMANGUYA', resave: true, saveUninitialized: true}))


const port = 8008;

app.get('/',async(req, res) => {
    try{
        const asset = await axios.get("https://shape-api.tupailabs.com/api/assets");

        console.log(req.session);
        
        let username = "";
        
        if(req.session.userToken){
            const userToken = req.session.userToken;
            const decoded = jwt.verify(userToken, 'nMxSMng0kZOFiomhFkH4z0QghBjbWPvgipBcM8UdfwpsQNwRKX3OW8FlapKEMdAN');
            if(decoded){
                username = req.session.username;
            }
        }

        if(asset){
            res.render('catalog', {
                layout: 'layout',
                data:asset.data.data,
                title: 'Tupai.Shape',
                username
            })
        }
    }
    catch(err){
        console.log(err);
    }
});

app.get('/detail/:id', async(req, res) => {
    let id =  req.params.id;
    let username = "";
    if(req.session.username){
        username = req.session.username;
    }
    try{
        const detail = await axios.get("https://shape-api.tupailabs.com/api/asset/"+id);
        const assetType = await axios.get("https://shape-api.tupailabs.com/api/asset/dropdown/"+id+"?dd_type=image_type");
        if(detail){
            console.log(detail);
            res.render('product-page', {
                layout: 'layout',
                data:detail.data.data,
                title: detail.data.data.asset_name + ' | Tupai.Shape',
                username,
                assettype: assetType.data.data
            })
        }
    }
    catch(err){
        console.log(err);
    }
    
});



app.get('/login',(req, res) => {
    res.render('login', {
        layout: false
    })
});


app.post('/login', async(req, res) => {
    
    let username = req.body.username;
    let password = req.body.password;
    const authLogin = await login(username,password,req,res);
});

app.get('/register',(req, res) => {
    res.render('register', {
        layout: false
    })
});

app.post('/register', async(req, res) => {
    let name1 = req.body.name;
    let username1 = req.body.username;
    let email1 = req.body.email;
    let password2 = req.body.password;
        const register = await axios.post("https://shape-api.tupailabs.com/api/user/registration",
        {
            "name" : name1,
            "username" : username1,
            "email" : email1,
            "password" : password2
        });
        res.json(register.data);
        console.log(register.data);
});

app.get("/logout", (req, res) => {
    req.session.destroy();
    res.send("Your are logged out ");
});

app.listen(port);