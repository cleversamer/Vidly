const Joi = require('joi');
const { genreSchema } = require('../models/genre');
const mongoose = require('mongoose');

const Movie = new mongoose.model('Movie', new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255
    },
    genre: {
        type: genreSchema,
        required: true
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: {
        type: Number,
        require: true,
        min: 0,
        max: 255
    }
}));

function validate(movie) {
    const schema = {
        title: Joi.string().min(5).max(255).required(),
        genreId: Joi.string().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required()
    }
    return Joi.validate(movie, schema);
}

exports.Movie = Movie;
exports.validate = validate();