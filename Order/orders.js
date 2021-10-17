const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios')

app.use(bodyParser.json());

require("./Order");
const Order = mongoose.model("Order");

mongoose.connect("mongodb+srv://dbUser:reydri1997@cluster0.qt0rg.mongodb.net/db_technology_user?retryWrites=true&w=majority", () =>{
    console.log("Database is connected");
})

app.post("/order", (req, res) =>{
    var newOrder = {
        UserID : mongoose.Types.ObjectId(req.body.UserID),
        CourseID : mongoose.Types.ObjectId(req.body.CourseID),
        startDate : req.body.startDate,
        endDate : req.body.endDate
    }

    var order = new Order(newOrder);

    order.save().then(() => {
        res.send("New order is created succesfully!");
    }).catch((err) => {
        throw err;
    })
})

app.get("/orders", (req, res) => {
    Order.find().then((courses) => {
        res.json(courses);
    }).catch((err) => {
        throw err;
    })
})

app.get('/order/:id', (req, res)=> {
    Order.findById(req.params.id).then((order)=>{
        if(order){

            axios.get("http://localhost:5000/user/" + order.UserID).then((response)=>{

                let orderData = {user_Name: response.data.name, course_Title: ''}

                axios.get("http://localhost:6000/course/" + order.CourseID).then((response)=>{

                    orderData.course_Title = response.data.title
                    res.json(orderData)
                })  
            })

        }else{
            res.send('Invalid Order')
        }
    })
})

app.listen(7000, () => {
    console.log("Order Service is running at http://localhost:7000");
})