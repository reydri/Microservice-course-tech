const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require("./User");
const User = mongoose.model("User");

mongoose.connect("mongodb+srv://dbUser:reydri1997@cluster0.qt0rg.mongodb.net/db_technology_user?retryWrites=true&w=majority", () =>{
    console.log("Database is connected!");
});

app.get('/', (req, res) => {
    res.send('Welcome to the training home!');
})

app.post('/user', (req, res) => {
    var newUser = {
        name: req.body.name,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
        password: req.body.password
    };

    var user = new User(newUser);

    user.save().then(() => {
        res.send("A new user created with success!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get('/users', (req, res) => {
    User.find().then((users) => {
        res.json(users);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.get('/user/email', (req, res) => {
    const email = req.query.email;
    var data = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};
    User.find(data).then((users) => {
        res.json(users);
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.get('/user/:id', (req, res) => {
    User.findById(req.params.id).then((user) => {
        if(user){
            res.json(user);
        }else{
            res.send('User not found');;
        }
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.delete('/user/:id', (req, res) => {
    User.findOneAndRemove(req.params.id).then((user) => {
        res.send("User deleted is success!")
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.put('/user/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false }).then((user) => {
        if(user){
            res.send("User was updated is successfully")
        }else{
            res.sendStatus(404).send('User is not found');;
        }
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.listen(5000, () => {
    console.log('This application is running at http://locahost:5000');
})