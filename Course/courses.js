const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

require("./Course");
const Course = mongoose.model("Course");

mongoose.connect("mongodb+srv://dbUser:reydri1997@cluster0.qt0rg.mongodb.net/db_technology_user?retryWrites=true&w=majority", () =>{
    console.log('Database is connected');
})

app.post('/course', (req, res) => {
    var newCourse = {
        name : req.body.name,
        title : req.body.title,
        price : req.body.price
    };
    var course = new Course(newCourse);

    course.save().then(() => {
        res.send("New course is created succesfully!");
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get('/courses', (req, res) => {
    Course.find().then((courses) =>{
        res.json(courses);
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.get('/course/price', async (req, res) => {
    let min = req.query.min;
    let max = req.query.max;

    try {
        const courses = await Course.find({ price: { $gt : min , $lt : max } });
        res.json(courses);
    } catch (err) {
        res.json({ message: err });
    }
})

app.get('/course/:id', (req , res) => {
    Course.findById(req.params.id).then((course) => {
        if(course){
            res.json(course);
        }else{
            res.send("Invalid ID");
        }
    }).catch((err) => {
        if(err){
            throw err;
        }
    })
})

app.delete('/course/:id', (req, res) => {
    Course.findOneAndRemove(req.params.id).then((course) => {
        res.send("Course deleted is success!")
    }).catch((err) =>{
        if(err){
            throw err;
        }
    })
})

app.listen(6000, () =>{
    console.log('Course Service is running at http://localhost:6000');
});