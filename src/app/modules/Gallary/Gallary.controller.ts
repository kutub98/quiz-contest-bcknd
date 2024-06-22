import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ServiceOfGallary } from './Gallary.service';


const createGallary = catchAsync(async (req, res) => {
  const result = await ServiceOfGallary.createGallary(req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Service created Successfully',
    data: result,
  });
});

const findeGallaryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfGallary.findeGallaryById(id);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrive single Gallary',
    success: true,
    data: result,
  });
});

const getAllGallarys = catchAsync(async (req, res) => {
  const result = await ServiceOfGallary.getAllGallarys();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Successfully retrived All Gallary',
    success: true,
    data: result,
  });
});

const updateGallaryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfGallary.updateGallaryById(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Service',
    data: result,
  });
});
const deleteGallaryById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ServiceOfGallary.deleteGallaryById(id);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Successfully update Service',
    data: result,
  });
});

export const GallaryController = {
  createGallary,
  getAllGallarys,
  findeGallaryById,
  updateGallaryById,
  deleteGallaryById,
};
