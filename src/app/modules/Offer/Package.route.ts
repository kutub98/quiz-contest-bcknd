import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { OfferValidation } from './Offer.validation';
import { OfferController } from './Offer.controller';

const router = express.Router();

router.post(
  '/',
  validateRequest(OfferValidation.createServiceValidationSchema),
  OfferController.createOffer,
);
router.get('/', OfferController.getAllOffers);
router.get('/:id', OfferController.findeOfferById);
router.patch('/:id', OfferController.updateOfferById);
router.delete('/:id', OfferController.deleteOfferById);

export const OfferRouter = router;
