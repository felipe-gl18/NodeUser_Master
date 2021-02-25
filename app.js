// EXPRESS CONFIG

const express = require('express');
const app = express();

// MONGOOSE 

const mongoose = require('mongoose');

// HANDLEBARS CONFIG

const handlebars = require('express-handlebars');
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//BODY-PARSER CONFIG

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//ROUTEs

const routeUsers = require('./routes/users');
app.use('/users', routeUsers);

// PRINCIPAL ROUTE

app.get('/', async(req,res)=>{
    try{
        res.render('CreateUser')
    }catch(err){
        console.log({message: err});
    }
})

// CONNECTION TO THE DB
// YOU JUST NEED CHANGE THE CONNECT AND PUT YOUR LOCALHOST 

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/test',{ useUnifiedTopology: true , useNewUrlParser: true }).then(()=>{
    console.log('Connected to DB');
}).catch((err)=>{
    console.log({message: err})
})

// LISTEN THE API
app.listen(2000, ()=>{
    console.log('The server is working');
})
