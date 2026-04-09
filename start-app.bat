@echo off
echo 🚀 Starting Anonymously Application with MongoDB Atlas
echo.

echo Step 1: Testing database connection...
node test-atlas-connection.js

echo.
echo Step 2: Starting the development server...
echo (Run this in a new terminal: npm run dev)

echo.
echo 🌐 Your app will be available at: http://localhost:3000
echo 📊 MongoDB Atlas cluster: cluster0.eo3blic.mongodb.net
echo 📱 MongoDB Compass: Connect with the same URI

pause