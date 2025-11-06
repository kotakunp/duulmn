import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IArtist extends Document {
  _id: Types.ObjectId;
  name: string;
  bio?: string;
  profileImage?: string;
  verified: boolean;
  followers: number;
  tracks: number;
  albums: number;
  createdAt: Date;
  updatedAt: Date;
}

const ArtistSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    default: ''
  },
  profileImage: {
    type: String,
    default: ''
  },
  verified: {
    type: Boolean,
    default: false
  },
  followers: {
    type: Number,
    default: 0
  },
  tracks: {
    type: Number,
    default: 0
  },
  albums: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model<IArtist>('Artist', ArtistSchema);