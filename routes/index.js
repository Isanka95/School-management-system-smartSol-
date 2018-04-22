var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");
var Student = require("../models/student");
var Teacher = require("../models/teacher");
var Principal = require("../models/principal");
var Admin = require("../models/admin");


router.get("/",function (req,res) {
    res.render("login");
})

router.get("/dashbord",function (req,res) {
    if(req.user.type==="admin"){
        Admin.findOne({"authent.id":req.user._id},function (err,admin) {
            if(err){
                console.log(err);
            }else {
                res.render("admin/index");
                console.log(admin);

            }
        })
    }else{
        res.redirect("/");
    }

});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/dashbord",
        failureRedirect: "/"
    }), function(req, res){
});

module.exports = router;
