import { Schema, model, models } from 'mongoose';

const BookingSchema = new Schema({
  organizerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  vendorId: {
    type: Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = models?.Booking || model('Booking', BookingSchema);

export default Booking;