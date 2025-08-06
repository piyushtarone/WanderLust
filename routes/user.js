const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveredirecturl } = require("../middleware.js");

router.get("/signup", (req, res,next) => {
    res.render("user/signup");
});

router.post("/signup",wrapAsync(async (req, res) => {
 
 try{
    let{username , email , password}=req.body;
 const newuser = new User({username, email});
 const registeredUser = await User.register(newuser, password);
 console.log(registeredUser);

 req.login(registeredUser, (err) => { // Automatically log in the user after registration
            if (err) return next(err);
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings"); // or wherever your homepage is
        });
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
}));

router.get("/login",saveredirecturl ,(req, res) => {
    res.render("user/login")});
    router.post("/login", passport.authenticate("local", {failureRedirect: "/login", failureFlash: true}), (req, res) => {
     
    req.flash("success", "Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirecturl || "/listings";
    res.redirect(redirectUrl);
});

router.get("/logout", (req, res,next) => {
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("Success","Loged out successfully");
        res.redirect("/listings");})
    })
module.exports = router;