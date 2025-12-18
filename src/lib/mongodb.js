import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Cache to hold the connection across hot reloads in development
let cached = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Connect to MongoDB using Mongoose
 * Caches the connection to avoid multiple connections during development
 */
async function connectDB() {
  // Return existing connection if it exists
  if (cached.conn) {
    return cached.conn;
  }

  // If a connection promise is in progress, use it
  if (!cached.promise) {
    if (!MONGODB_URI) {
      throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
      );
    }

    const options = {
      bufferCommands: false, // Disable Mongoose buffering
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

export default connectDB;
