import mongoose, { Schema } from 'mongoose';
import { IOffer } from './Offer.interface';

const OfferSchema: Schema<IOffer> = new mongoose.Schema({
  img: {
    type: String,
    required: true,
  },
  OfferName: {
    type: String,
    required: true,
  },
  OfferDetails: {
    type: String,
    required: true,
  },
  OfferInfo: {
    type: [String],
    required: true,
  },
  status: {
    type: String,
    enum: ['approved', 'delete', 'pending'],
    default: 'pending',
  },
});

export const Offer = mongoose.model<IOffer>('Offer', OfferSchema);
