import { check } from 'express-validator';
import { Router } from 'express';

import { getVehicleById, getVehicles } from '../controllers/vehicles.js';
import { vehicleExists } from '../helpers/db-validators.js';
import { validateFields } from '../middlewares/validate-fields.js';

const router = Router();

router.get('/', [], getVehicles);

router.get('/:id', [
    check('id').isInt().withMessage('Must be an valid id'),
    check('id').custom(vehicleExists).withMessage('Vehicle not found'),
    validateFields
], getVehicleById);

export default router;