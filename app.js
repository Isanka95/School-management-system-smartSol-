var express    = require("express"),
    bodyparser = require("body-parser"),
    mongoose   = require("mongoose"),
    passport   = require("passport"),
    LocalStrategy = require("passport-local"),
    User        = require("./models/user"),
    Admin       = require("./models/admin"),
    seedDB     = require("./seeds");


// =====require routes =======
var indexRoutes      = require("./routes/index"),
    usersRoutes      = require("./routes/users");



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

 //====calling routes===
app.use("/", indexRoutes);
app.use("/users", usersRoutes);

app.listen(3000,function () {
    console.log("SMS server has started!")
})