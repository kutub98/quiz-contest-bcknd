import express from 'express';

import { serviceController } from './Service.controller';
import { serviceValidation } from './Service.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post(
  '/',
  validateRequest(serviceValidation.createServiceValidationSchema),
  serviceController.createServices,
);
router.get('/', serviceController.getAllServices);
router.get('/:id', serviceController.findeServiceById);
router.patch('/:id', serviceController.updateServiceById);
router.delete('/:id', serviceController.deleteServiceById);

export const ServiceRoute = router;
