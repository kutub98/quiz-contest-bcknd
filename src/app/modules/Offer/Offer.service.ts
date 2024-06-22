import { IOffer } from './Offer.interface';
import { Offer } from './Offer.modal';

const createOffer = async (OfferService: IOffer) => {
  return await Offer.create(OfferService);
};

const findeOfferById = async (OfferId: string) => {
  return await Offer.findById(OfferId);
};

const getAllOffers = async () => {
  return await Offer.find();
};

const updateOfferById = async (
  OfferId: string,
  payload: Partial<IOffer>,
) => {
  const result = await Offer.findByIdAndUpdate(OfferId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteOfferById = async (OfferId: string) => {
  const result = await Offer.findByIdAndDelete(OfferId);

  return result;
};

export const ServiceOfOffer = {
  createOffer,
  getAllOffers,
  updateOfferById,
  deleteOfferById,
  findeOfferById,
};
