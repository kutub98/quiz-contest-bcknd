import { IGallary } from './Gallary.interface';
import { Gallary } from './Gallary.modal';

const createGallary = async (GallaryService: IGallary) => {
  return await Gallary.create(GallaryService);
};

const findeGallaryById = async (GallaryId: string) => {
  return await Gallary.findById(GallaryId);
};

const getAllGallarys = async () => {
  return await Gallary.find();
};

const updateGallaryById = async (GallaryId: string, payload: Partial<IGallary>) => {
  const result = await Gallary.findByIdAndUpdate(GallaryId, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteGallaryById = async (GallaryId: string) => {
  const result = await Gallary.findByIdAndDelete(GallaryId);

  return result;
};

export const ServiceOfGallary = {
  createGallary,
  getAllGallarys,
  updateGallaryById,
  deleteGallaryById,
  findeGallaryById,
};
