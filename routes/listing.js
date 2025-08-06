const express = require("express")
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Expresserror = require("../utils/Expresserror.js")
// const {listingSchema , reviewSchema} = require("../schema.js")
const Listing = require("../models/listing.js") //indicztion error not a problem
const{isloggedin} = require("../middleware.js");

const validatelisting = (req,res,next)=>{
    let{error}= listingSchema.validate(req.body);
    if (error){
        let errmsg = error.details.map((el)=> el.message).join(",");
        throw new Expresserror(404,errmsg);
    }else{
        next();
    }
};


// Index Route
router.get("/", async (req,res)=>{
 const allListings = await Listing.find({});
 res.render("./listings/index.ejs", {allListings});
});

// Update route
router.put("/:id",isloggedin, async (req,res)=>{
    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect(`/listings/${id}`)
})

// new Route
router.get("/new",isloggedin,(req,res)=>{
    
    res.render("listings/new.ejs");
})

// Create Route 
router.post("/",isloggedin,wrapAsync (async (req,res,next)=>{
    const newlisting = new Listing(req.body.listing);
    newlisting.owner = req.user._id; // This sets the owner of the listing to the currently logged-in user
    await newlisting.save();
    req.flash("success","New Listing Created Successfully");
    res.redirect("/listings");
})
);

// Show Route
router.get("/:id",wrapAsync( async (req,res)=>{
let {id} = req.params;
const listing = await Listing.findById(id)
.populate({path:"reviews",populate:{path: "author",},}) //nested Populate to get the review as well as the author of the review 
.populate("owner");
if(!listing){
    req.flash("error","Listing you requested does not exist"); //This will flash an error message
    res.redirect("/listings"); //This will redirect to the index page
}
res.render("./listings/show.ejs",{listing})
}));

// Edit Route 
router.get("/:id/edit",isloggedin, wrapAsync(async (req,res)=>{
    let {id} = req.params;
    const listing = await Listing.findById(id);
    req.flash("success","Listing Edited Successfully");

    if(!listing){
    req.flash("error","Listing you requested does not exist"); //This will flash an error message
    res.redirect("/listings"); //This will redirect to the index page
}
    res.render("./listings/edit.ejs",{listing});
}));

// Delete Route
router.delete("/:id",isloggedin,wrapAsync( async (req,res)=>{
    let {id} = req.params;
    const deletedlist = await Listing.findByIdAndDelete(id);
    req.flash("error","Listing Deleted Successfully");

    res.redirect("/listings");
    console.log(deletedlist);
}));

module.exports = router;