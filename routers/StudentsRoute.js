// This file will contain all the routes for students

const express = require('express');
const Student = require('../model/StudentModel');

const router = express.Router();

// Get all the students
router.get('/',(req,res)=>{
    // find() - is a mongoDB command to get all objects
    // exec() - will run the command in the db.
    Student.find({}).exec((err,students)=>{
        if(err) console.log(err.message);
        else res.json(students);
    })
})

// POST - Add a new student
router.post('/add', (req,res)=>{
    let newStudent = new Student();
    newStudent.name = req.body.name;
    newStudent.age = req.body.age;
    newStudent.degree =  req.body.degree;
    newStudent.avg = req.body.avg;

    newStudent.save((err, student)=>{
        if(err){
            res.status(404);
            res.send("Failed saving...");
        }
        else{
            res.status(201);
            res.send('New Student was added successfully');
        }
    })
})

// PUT - update the average's student:
router.put('/update/:name',(req,res)=>{
    Student.findOneAndUpdate(
        { name: req.params.name}, { $set: {avg: req.body.newAvg }},
        (err, updateStudent) =>{
            if(err){
                res.status(404);
                res.send(`Failed updating the new Average for the student ...`);
            }
            else{
                res.status(200);
                res.send(`The new Average for the student was updated successfully`);
            }
        }
    )
})

// DELETE- delete student by name
router.delete('/delete/:name',(req,res)=>{
    Student.deleteOne({name: req.params.name}).exec((err,student)=>{
        if(err) {
            res.status(404);
            res.send("Failed deleteing student");

        }
        else {
            res.status(200);
            res.json(`Student was deleted successfully`);
        }
    })
})



// export the file
module.exports = router;