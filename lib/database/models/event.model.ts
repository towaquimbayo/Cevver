import { Document, Schema, model, models } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  description: string;
  date: Date;
  location: string;
  budget: number;
  organizerId: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

const EventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  budget: {
    type: Number,
    required: true,
  },
  organizerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Event = models?.Event || model('Event', EventSchema);

export default Event;