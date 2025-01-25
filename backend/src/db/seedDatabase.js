import fs from 'fs';
import path from 'path';

import { defineVehicleModel } from '../models/vehicle.js';
import sequelize from './connection.js';

const Vehicle = defineVehicleModel(sequelize);

export const seedDatabase = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: true });
        const filePath = path.join(process.cwd(), 'src/db', 'data.json');
        const rawData = fs.readFileSync(filePath, 'utf-8');
        const vehicles = JSON.parse(rawData);
        await Vehicle.bulkCreate(vehicles);
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

export default Vehicle;