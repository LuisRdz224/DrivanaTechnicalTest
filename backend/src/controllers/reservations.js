import { handleError } from '../helpers/errors.js';
import { updateVehicleInJson } from '../utils/jsonFileUtils.js';
import Vehicle from '../db/seedDatabase.js';

export const reserveVehicle = async (req, res) => {
    try {
        const { id, start_date, end_date } = req.body;
        const vehicle = await Vehicle.findByPk(id);
        const reservations = vehicle.reservations || [];
        reservations.push({ start_date, end_date });
        vehicle.reservations = reservations;
        await vehicle.save();
        updateVehicleInJson(id, reservations);
        res.status(200).json({ message: 'Vehicle reserved', vehicle });
    } catch (error) {
        handleError({
            error,
            statusCode: 500,
            message: 'Internal server error'
        }, res)
    };
};