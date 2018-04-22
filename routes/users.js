var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Student = require("../models/student");
var Teacher = require("../models/teacher");
var Principal = require("../models/principal");
var Admin = require("../models/admin");

router.get("/new",function (req,res) {
    res.render("admin/createUser");
});

router.post("/",function (req,res) {
    // res.send(req.body);
    var newUser = new User({username:req.body.index, type:req.body.type});
    User.register(newUser,req.body.type,function (err,user) {
        if(err){
            console.log(err);
            return res.redirect("users/new");
        }else {
            if(req.body.type==="student"){
                var newStudent = new Student({
                    name:req.body.name,
                    birthday:req.body.date,
                    address:req.body.address
                })
                Student.create(newStudent,function (err,student) {
                    if(err){
                        console.log(err);
                    }else {
                        student.authent.id=user._id;
                        student.authent.username=user.username;
                        student.save();
                        console.log("Student created!!!");
                        res.redirect("users/new");
                    }
                })

            }else if(req.body.type==="teacher"){
                var newTeacher = new Teacher({
                    name:req.body.name,
                    birthday:req.body.date,
                    address:req.body.address
                })
                Student.create(newTeacher,function (err,teacher) {
                    if(err){
                        console.log(err);
                    }else {
                        teacher.authent.id=user._id;
                        teacher.authent.username=user.username;
                        teacher.save();
                        console.log("Teacher created!!!");
                        res.redirect("users/new");
                    }
                })
            }
        }
    })
});
module.exports = router;