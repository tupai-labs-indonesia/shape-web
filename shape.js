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


const port = 8000;

app.get('/',async(req, res) => {
    try{
        const asset = await axios.get("https://shape-api.tupailabs.com/api/assets");
        if(asset){
            res.render('catalog', {
                layout: false,
                data:asset.data
            })
        }
    }
    catch(err){
        console.log(err);
    }
});

app.get('/detail', (_req, res) => {
    res.render('product-page', {
        layout: false
    })
});

app.listen(port);