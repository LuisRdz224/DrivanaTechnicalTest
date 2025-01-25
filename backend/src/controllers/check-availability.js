import { handleError } from '../helpers/errors.js';
import Vehicle from '../db/seedDatabase.js';

export const checkCarAvailability = async (req, res) => {
    try {
        const { id, start_date, end_date } = req.body;
        const vehicle = await Vehicle.findByPk(id);
        return res.json({
            message: `${vehicle.name} is available from ${start_date} to ${end_date}`,
            vehicle
        });
    } catch (error) {
        handleError({
            error,
            statusCode: 500,
            message: 'Internal server error'
        }, res)
    };
};