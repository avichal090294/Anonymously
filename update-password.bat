@echo off
echo 🔑 MongoDB Atlas Password Update Helper
echo.

set /p PASSWORD="Enter your MongoDB Atlas password: "

echo Updating .env file with new password...
powershell -Command "(Get-Content .env) -replace 'admin:[^@]*@', 'admin:%PASSWORD%@' | Set-Content .env"

echo.
echo ✅ Password updated in .env file
echo.
echo Testing connection...
node test-atlas-connection.js

pause