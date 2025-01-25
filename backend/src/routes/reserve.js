import { check } from 'express-validator';
import { Router } from 'express';

import { overlapDates, vehicleExists } from '../helpers/db-validators.js';
import { reserveVehicle } from '../controllers/reservations.js';
import { validateFields, validateDates } from '../middlewares/validate-fields.js';

const router = Router();

router.post('/', [
    check('id').trim().notEmpty().withMessage('id is required').bail().isInt().withMessage('id is not valid').bail().custom(vehicleExists).bail().custom(overlapDates),
    check('start_date').trim().notEmpty().withMessage('Start date is required').bail().isDate().withMessage('Start date must be a valid date'),
    check('end_date').trim().notEmpty().withMessage('End date is required').bail().isDate().withMessage('End date must be a valid date'),
    validateDates,
    validateFields
], reserveVehicle);

export default router;