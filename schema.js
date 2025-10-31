const Joi = require("joi");

// ✅ Validation for Listings
module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().messages({
            "string.empty": "Title is required."
        }),
        description: Joi.string().required().messages({
            "string.empty": "Description is required."
        }),
        price: Joi.number().required().min(0).messages({
            "number.base": "Price must be a number.",
            "number.min": "Price cannot be negative."
        }),
        location: Joi.string().required().messages({
            "string.empty": "Location is required."
        }),
        country: Joi.string().required().messages({
            "string.empty": "Country is required."
        }),
        image: Joi.object({
            url: Joi.string().optional(),
            filename: Joi.string().optional()
        }).optional()
    }).required()
});

// ✅ Validation for Reviews
module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required().messages({
            "string.empty": "Comment cannot be empty."
        }),
        rating: Joi.number().required().min(1).max(5).messages({
            "number.base": "Rating must be a number between 1 and 5.",
            "number.min": "Rating cannot be less than 1.",
            "number.max": "Rating cannot be more than 5."
        })
    }).required()
});
