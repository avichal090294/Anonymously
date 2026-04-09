import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function testAtlasConnection() {
  try {
    console.log('🔄 Testing MongoDB Atlas connection...');
    console.log('📍 Connection URL: mongodb+srv://admin:***@cluster0.eo3blic.mongodb.net/anonymously');

    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    await mongoose.connect(process.env.MONGODB_URI, {
      // Atlas specific options
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log('✅ Successfully connected to MongoDB Atlas!');
    console.log('📊 Database:', mongoose.connection.db.databaseName);
    console.log('🌐 Host:', mongoose.connection.host);

    // Test database operations
    const db = mongoose.connection.db;
    const collections = await db.collections();
    console.log('📁 Collections found:', collections.length);

    await mongoose.disconnect();
    console.log('🔌 Disconnected from database');

  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error details:', error.message);

    if (error.message.includes('authentication failed')) {
      console.log('💡 Tip: Check your password in the .env file');
    } else if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.log('💡 Tip: Check your internet connection and cluster URL');
    }
  }
}

testAtlasConnection();