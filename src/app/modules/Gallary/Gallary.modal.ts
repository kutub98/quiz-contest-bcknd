import mongoose, { Schema } from 'mongoose';
import { IGallary } from './Gallary.interface';

const GallarySchema: Schema<IGallary> = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'delete', 'pending'],
    default: 'pending',
  },
});

export const Gallary = mongoose.model<IGallary>('Gallary', GallarySchema);
