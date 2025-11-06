import mongoose, { Schema, Document } from 'mongoose';

export interface ISong extends Document {
  title: string;
  artist: string; // Artist name or ObjectId reference
  artistId?: mongoose.Types.ObjectId; // Reference to Artist model
  album?: string;
  duration: string; // Format: MM:SS
  genre?: string;
  lyrics?: string;
  coverImage?: string;
  filePath?: string; // Path to the audio file
  plays: number;
  likes: number;
  language?: string;
  lyricsSync?: { time: number; text: string }[]; // For synced lyrics
  createdAt: Date;
  updatedAt: Date;
}

const SongSchema: Schema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  artist: {
    type: String,
    required: true,
    trim: true
  },
  artistId: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    default: null
  },
  album: {
    type: String,
    default: ''
  },
  duration: {
    type: String, // Format: MM:SS
    required: true
  },
  genre: {
    type: String,
    default: ''
  },
  lyrics: {
    type: String,
    default: ''
  },
  coverImage: {
    type: String,
    default: ''
  },
  filePath: {
    type: String,
    default: ''
  },
  plays: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: 'Mongolian' // Default to Mongolian as per the app name 'Duul.mn'
  },
  lyricsSync: [{
    time: Number,
    text: String
  }]
}, {
  timestamps: true
});

export default mongoose.model<ISong>('Song', SongSchema);