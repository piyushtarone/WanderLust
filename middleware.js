const Listing = require("./models/listing");
const ExpressError = require("./utils/Expresserror");
const { listingSchema, reviewSchema } = require("./models/review");

module.exports.isloggedin = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirecturl=req.originalurl
        req.flash("error","You must be signed in to create a listing");
        return res.redirect("/login");
    }next()};

module.exports.saveredirecturl = (req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl = req.session.redirecturl;
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    let {id, reviewID} = req.params;
    let review = await Review.findById(reviewID);
    if(!review.author.equals(res.locals.currentUser._id)){
        req.flash("error","You do not the author of the review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}