const http = require('http');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const { assert } = require('console');

app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = 8008;

app.get('/',async(req, res) => {
    try{
        const asset = await axios.get("https://shape-api.tupailabs.com/api/assets");
        if(asset){
            console.log(asset);
            res.render('catalog', {
                layout: false,
                data:asset.data.data
            })
        }
    }
    catch(err){
        console.log(err);
    }
});

app.get('/detail/:id', async(req, res) => {
    let id =  req.params.id;
    try{
        const detail = await axios.get("https://shape-api.tupailabs.com/api/asset/"+id);
        if(detail){
            console.log(detail);
            res.render('product-page', {
                layout: false,
                data:detail.data.data
            })
        }
    }
    catch(err){
        console.log(err);
    }
    
});

app.listen(port);