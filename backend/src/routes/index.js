import { Router } from 'express';

import checkAvailabilityRoutes from './check-availability.js';
import reserveRoutes from './reserve.js';
import vehiclesRoutes from './vehicles.js';

const router = Router();

router.use('/api/check-availability', checkAvailabilityRoutes);
router.use('/api/reserve', reserveRoutes);
router.use('/api/vehicles', vehiclesRoutes);

export default router;