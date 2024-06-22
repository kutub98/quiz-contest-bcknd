import mongoose, { Schema } from "mongoose";
import { IService } from "./Service.interface";


const ServicesSchema: Schema<IService> = new mongoose.Schema({
  img: {
    type: String,
    required: true
  },
  servicesName: {
    type: String,
    required: true
  },
  servicesDetails: {
    type: String,
    required: true
  },
  serviceInfo: {
    type: [String],
    required: true
  },
  status: {
    type: String,
    enum: ['approved', 'delete', 'pending'],
    default: 'pending',
  }

})

export const Service = mongoose.model<IService>('Service', ServicesSchema);