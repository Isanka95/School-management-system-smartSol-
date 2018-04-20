var express    = require("express"),
    bodyparser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    Admin       = require("./models/admin"),
    seedDB     = require("./seeds");


var app = express();
app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.set('view engine',"ejs");

app.use(express.static(__dirname + "/public"));

// connect with DB
mongoose.connect("mongodb://localhost/SMS");

//==========Passport configuration=============
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// seed the db

seedDB();


app.get("/",function (req,res) {
    res.render("admin/index");
})

app.get("/dashbord",function (req,res) {
    res.render("admin/index");
    // console.log(req);
    // console.log(req.user.isUser==true);
    Admin.findOne({"authent.id":req.user._id},function (err,admin) {
        if(err){
            console.log(err);
        }else {
            console.log(admin);
        }
    })

})

app.post("/login", passport.authenticate("local",
    {
        successRedirect: "/dashbord",
        failureRedirect: "/"
    }), function(req, res){
});


app.listen(3000,function () {
    console.log("SMS server has started!")
})