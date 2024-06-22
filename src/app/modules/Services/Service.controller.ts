import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServicesOfService } from './Sevices.service';

const createServices = catchAsync(async (req, res) => {
  const result = await ServicesOfService.createService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service created Successfully',
    data: result,
  });
});

const findeServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServicesOfService.findeServiceById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single Services',
    success: true,
    data: result,
  });
});

const getAllServices = catchAsync(async (req, res) => {
  const result = await ServicesOfService.getAllServices();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All services',
    success: true,
    data: result,
  });
});

const updateServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServicesOfService.updateServiceById(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Service',
    data: result,
  });
});
const deleteServiceById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServicesOfService.deleteServiceById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Service',
    data: result,
  });
});

export const serviceController = {
  createServices,
  getAllServices,
  findeServiceById,
  deleteServiceById,
  updateServiceById,
};
