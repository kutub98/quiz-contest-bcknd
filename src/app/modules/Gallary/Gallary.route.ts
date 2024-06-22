import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { GallaryValidation } from './Gallary.validation';
import { GallaryController } from './Gallary.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(GallaryValidation.createGallaryValidationSchema),
  GallaryController.createGallary,
);
router.get('/', GallaryController.getAllGallarys);
router.get('/:id', GallaryController.findeGallaryById);
router.patch('/:id', GallaryController.updateGallaryById);
router.delete('/:id', GallaryController.deleteGallaryById);

export const GallaryRouter = router;
