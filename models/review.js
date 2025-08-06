const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewschema = new Schema({
    comment : String,
    rating :{
        type: Number,
        min:1,
        max:5
    },
    CreatedAt:{
        type: Date,
        default: Date.now()
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "user" // This references the user model
    }
})

const review = mongoose.model("review",reviewschema);
module.exports=review;