import Vehicle from '../db/seedDatabase.js';

export const vehicleExists = async (id) => {
    const vehicle = await Vehicle.findByPk(id);
    if (!vehicle) {
        throw new Error('Vehicle not found');
    }
    return true;
};

export const overlapDates = async (id, { req }) => {
    const { start_date, end_date } = req.body;
    const vehicle = await Vehicle.findByPk(id);
    const reservations = vehicle.reservations || [];
    const newStartDate = new Date(start_date);
    const newEndDate = new Date(end_date);

    if (newStartDate > newEndDate) {
        throw new Error('Start date must be before or equal to end date');
    }

    for (const reservation of reservations) {
        const existingStartDate = new Date(reservation.start_date);
        const existingEndDate = new Date(reservation.end_date);
        if (
            (newStartDate >= existingStartDate && newStartDate < existingEndDate) ||
            (newEndDate > existingStartDate && newEndDate <= existingEndDate) ||
            (newStartDate <= existingStartDate && newEndDate >= existingEndDate)
        ) {
            throw new Error('Dates overlap with existing reservation');
        }
    }

    return true;
};