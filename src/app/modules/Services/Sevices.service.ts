import { IService } from "./Service.interface";
import { Service } from "./Service.modal";

const createService = async (service: IService) => {
  return await Service.create(service)
}

const findeServiceById = async (serviceId: string) => {
  return await Service.findById(serviceId)
}

const getAllServices = async () => {
  return await Service.find();
}

const updateServiceById = async (serviceId: string,
  payload: Partial<IService>) => {
  const result = await Service.findByIdAndUpdate(serviceId, payload, {
    new: true,
    runValidators: true
  })
  return result
}


const deleteServiceById = async (serviceId: string) => {
  const result = await Service.findByIdAndDelete(serviceId)

  return result
}


export const ServicesOfService = {
  createService,
  getAllServices,
  updateServiceById,
  deleteServiceById,
  findeServiceById
}