import { handleError } from '../helpers/errors.js';
import Vehicle from '../db/seedDatabase.js';

export const getVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.findAll();
        res.json(vehicles);
    } catch (error) {
        handleError(
            {
                error,
                statusCode: 500,
                message: 'Internal server error'
            },
            res
        )
    };
};

export const getVehicleById = async (req, res) => {
    try {
        const vehicles = await Vehicle.findByPk(req.params.id);
        res.json(vehicles);
    } catch (error) {
        handleError({
            error,
            statusCode: 500,
            message: 'Internal server error'
        }, res)
    };
};