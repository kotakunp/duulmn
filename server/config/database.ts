import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    // If already connected, return
    if (mongoose.connection.readyState >= 1) {
      console.log("MongoDB already connected");
      return;
    }

    // Validate that MONGODB_URI is set
    const dbUri = process.env.MONGODB_URI;
    if (!dbUri) {
      throw new Error("MONGODB_URI environment variable is not set");
    }

    // Modern MongoDB/Mongoose connection options for cloud deployment
    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 30000, // Timeout after 30s for cloud connections
      maxPoolSize: 10, // Maintain up to 10 socket connections
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose command buffering
      // bufferMaxEntries: REMOVED — not supported by mongodb v4+
    };

    console.log("Connecting to MongoDB...");
    const conn = await mongoose.connect(dbUri, options);

    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Listen for connection events
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    // Register SIGINT handler only once to avoid duplicate handlers
    if (process.listenerCount("SIGINT") === 0) {
      process.on("SIGINT", async () => {
        try {
          await mongoose.connection.close();
          console.log("MongoDB connection closed through app termination");
        } catch (closeErr) {
          console.error(
            "Error closing MongoDB connection during SIGINT:",
            closeErr
          );
        } finally {
          process.exit(0);
        }
      });
    }
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);

    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes("ECONNREFUSED")) {
        console.error(
          "Could not connect to MongoDB server. Is MongoDB running?"
        );
      } else if (error.message.includes("Authentication failed")) {
        console.error(
          "MongoDB authentication failed. Check your username and password."
        );
        console.error("\nTroubleshooting steps for MongoDB Atlas authentication:");
        console.error("1. Verify your connection string format: mongodb+srv://username:password@cluster.mongodb.net/database");
        console.error("2. Make sure special characters in password are URL encoded (@, :, /, ?, #, [, ], etc.)");
        console.error("3. Ensure the database user exists in MongoDB Atlas with correct permissions");
        console.error("4. Check that your IP address is whitelisted in MongoDB Atlas Network Access settings");
        console.error("5. Verify the cluster name and database name in your connection string are correct");
        console.error("6. For local development, temporarily add 0.0.0.0/0 to IP access list (not recommended for production)");
      } else if (error.message.includes("failed to connect to server")) {
        console.error(
          "Could not reach MongoDB server. Check your connection string and network connectivity."
        );
        console.error("Make sure your IP is whitelisted in MongoDB Atlas network access settings");
      } else if (error.message.includes("invalid ObjectId")) {
        console.error("Invalid ObjectId detected in your query.");
      }
    }

    process.exit(1);
  }
};

export default connectDB;
