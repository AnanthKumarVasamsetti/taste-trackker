
import mongoose from 'mongoose';

let cachedConnection: typeof mongoose | null = null;

export async function connectToDatabase() {
  // If we already have a connection, use it
  if (cachedConnection) {
    return cachedConnection;
  }

  const MONGODB_URI = import.meta.env.VITE_MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('MONGODB_URI environment variable is not defined');
  }

  try {
    const connection = await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');
    cachedConnection = connection;
    return connection;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    throw error;
  }
}
