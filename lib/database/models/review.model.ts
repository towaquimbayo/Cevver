import { Document, Schema, model, models } from 'mongoose';

export interface IReview extends Document {
  rating: number;
  review: string;
  reviewerId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  vendorId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

const ReviewSchema = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
  },
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = models?.Review || model('Review', ReviewSchema);

export default Review;