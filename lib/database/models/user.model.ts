import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  phone: {
    type: String,
  },
  photo: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['vendor', 'organizer'],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models?.User || model('User', UserSchema);

export default User;