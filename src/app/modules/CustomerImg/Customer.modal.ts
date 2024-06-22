import mongoose, { Schema } from 'mongoose';
import { ICustomer } from './Customer.interface';

const CustomerSchema: Schema<ICustomer> = new mongoose.Schema({
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

export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
