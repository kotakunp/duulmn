import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  username: string;
  password: string;
  profileImage?: string;
  role: 'user' | 'admin' | 'artist';
  isPremium: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profileImage: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'artist'],
    default: 'user'
  },
  isPremium: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);