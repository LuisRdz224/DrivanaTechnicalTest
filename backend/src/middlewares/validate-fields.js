import { validationResult } from 'express-validator';

export const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }
    next();
};

export const validateDates = (req, res, next) => {
    const start = new Date(req.body.start_date);
    const end = new Date(req.body.end_date);

    if (start > end) {
        return res.status(400).json({ message: 'Start date must be before end date' });
    }
    next();
};