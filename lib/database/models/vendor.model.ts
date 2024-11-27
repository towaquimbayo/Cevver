import { Document, Schema, model, models } from 'mongoose';

export interface IVendor extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  tags: string[];
  images: string[];
  vendorId: {
    _id: string;
    firstName: string;
    lastName: string;
  }
}

const VendorSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
  },
  images: {
    type: [String],
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Vendor = models?.Vendor || model('Vendor', VendorSchema);

export default Vendor;