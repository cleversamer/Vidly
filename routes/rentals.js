const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();

routet.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Customer with the given ID was not found.');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Movie with the given ID was not found.');

    let rental = new Rental({
        customer: {
            id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    rental = rental.save();

    movie.numberInStock--;
    movie.save();

    res.send(rental);
});