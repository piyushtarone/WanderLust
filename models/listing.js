const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js")
const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },
    price: Number,
    location: String,
    // image:{
    //    type: string,
    //     default: "https://cdn.pixabay.com/photo/2020/01/03/05/36/house-4737447_1280.png",
    //     set: (v)=> v===""? "https://www.adanirealty.com/-/media/project/realty/blogs/types-of-residential-properties.ashx":v
    // },
    image: {
        url:String,
        filename: String
    },
    country: String,

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref : "review",
        },
    ],
    owner:{
        type:Schema.Types.ObjectId, //this is the id of the user who created the listing
        ref: "User", 
    }
})

// This is done so that when the listing is deleted the reviews related to the listing will also get deleted
// Its a middle ware which enables when the findoneandupdate query calls
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await Review.deleteMany({_id: {$in : listing.reviews}})
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;