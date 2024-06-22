import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceOfOffer } from './Offer.service';


const createOffer = catchAsync(async (req, res) => {
  const result = await ServiceOfOffer.createOffer(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service created Successfully',
    data: result,
  });
});

const findeOfferById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfOffer.findeOfferById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single Offer',
    success: true,
    data: result,
  });
});

const getAllOffers = catchAsync(async (req, res) => {
  const result = await ServiceOfOffer.getAllOffers();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All Offer',
    success: true,
    data: result,
  });
});

const updateOfferById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfOffer.updateOfferById(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Service',
    data: result,
  });
});
const deleteOfferById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfOffer.deleteOfferById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Service',
    data: result,
  });
});

export const OfferController = {
  createOffer,
  getAllOffers,
  findeOfferById,
  updateOfferById,
  deleteOfferById,
};
