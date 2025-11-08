import app from './app';
import connectDB from './config/database';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Health check available at http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();