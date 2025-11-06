import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    // If already connected, return
    if (mongoose.connection.readyState >= 1) {
      return;
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/duulmn');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;