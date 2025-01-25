import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/db', 'data.json');

export const readJsonFile = () => {
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
};

export const writeJsonFile = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
};

export const updateVehicleInJson = (id, reservations) => {
    const vehicles = readJsonFile();

    const vehicleIndex = vehicles.findIndex((v) => v.id === parseInt(id, 10));

    if (vehicleIndex !== -1) {
        vehicles[vehicleIndex].reservations = reservations;
        writeJsonFile(vehicles);
    }
};