'use strict';

const router = require('express').Router();
const Joi = require('joi');
const School = require("../models/school");

// Helper function to calculate the distance between two coordinates using the Haversine formula
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180; //converts degrees to radians
    const dLon = (lon2 - lon1) * Math.PI / 180; //converts degrees to radians
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2); //haversine formula to calculate great-circle distance
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); //calculate angular distance
    return R * c;//converting angular distance to linear distance // Distance in km
}

router.post('/addSchool', async (req, res) => {
    try {
        let verifySchema = Joi.object({
            name: Joi.string().required(),
            address: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required()
        });
        let validData = await verifySchema.validateAsync(req.body);
        await School.create(validData);
        return res.status(200).send({
            status: 'success',
            message: 'Successfully Created'
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

router.get('/listSchools', async (req, res) => {
    try {
        // Extract user's latitude and longitude from query parameters
        const { latitude, longitude } = req.query;

        // Fetch all schools from the database
        let schools = await School.findAll();

        if (latitude && longitude) {
            // Add distance property to each school
            schools = schools.map(school => {
                const distance = calculateDistance(
                    parseFloat(latitude),
                    parseFloat(longitude),
                    school.latitude,
                    school.longitude
                );
                return { ...school.dataValues, distance };
            });

            // Sort schools by distance
            schools.sort((a, b) => a.distance - b.distance);
        }
        
        return res.status(200).send({
            status: 'success',
            message: 'Data fetched successfully',
            data: schools
        });
    } catch (error) {
        return res.status(400).send({
            status: 'error',
            message: error.message
        });
    }
});

module.exports = router;



