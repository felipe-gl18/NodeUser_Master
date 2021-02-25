const express = require('express');
const route = express.Router();
const User = require('../models/User');

// <<<---RENDERENIZANDO O CRUD--->>>

// REGISTER USER VIEW

route.get('/cadastrarUser', async(req,res)=> {
    try{
        res.render('CreateUser');
    }catch(err) {
        console.log({message: err});
    }
});

// LIST USERS VIEW

route.get('/pegarUser', async(req,res)=>{
    const ListUser = await User.find().sort({date: 'desc'}).lean();
    try{
        res.render('ListUser',{users: ListUser});
    }catch(err) {
        console.log({message:err});
    }
});

// UPDATE USERS VIEW

route.get('/atualizarUser', async(req,res)=>{
    try{
        res.render('UpdateUser')
    }catch(err){
        console.log({message:err});
    }
});

// DELETE USERS VIEW

route.get('/deletarUser', async(req,res)=>{
    try{
        res.render('DeleteUser')
    }catch(err){
        console.log({message:err});
    }
});


// <<<---CRUD--->>>

// CREATE USER

route.post('/addUser', async(req,res)=> {
    const newUser = new User(
        {
            name: req.body.name,
            email: req.body.email,
            password: req.body.senha
        }
    );
    try {
        const SavedUser = await newUser.save();
        res.send(SavedUser +'<br>The user sign up with success');
    }catch(err) {
        console.log({message: err});
    }

});

// READ USER

route.post('/getUser', async(req,res)=>{
    const FindUser = await User.find({name: req.body.name}).sort({date: 'desc'}).lean();
    try{
        res.render('FindUser',{users: FindUser});
    }catch(err){
        console.log({message:err});
    }
})

// UPDATE USER

route.post('/updateUser', async(req,res)=>{
    try{
        const UpdateUser = await User.updateOne(
            {
                email: req.body.email
            },
            {
                name: req.body.name,
                password: req.body.password
            }
        );
        res.send('User changed')
    }catch(err){
        console.log({message:err});
    }
});

//DELETE USER

route.post('/deleteUser', async(req,res)=>{
    try{
        const DeleteUser = await User.deleteOne(
            {
                name: req.body.name,
            }
        );
        res.send('User Removed');
    }catch(err){
        console.log({message:err});
    }
});

module.exports = route;
