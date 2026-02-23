#!/bin/bash

# FEDF Backend Startup Script
# Starts the Spring Boot application on port 8989

echo "=========================================="
echo "FEDF Backend - Spring Boot Application"
echo "=========================================="
echo ""

# Check if MongoDB is running
echo "Checking MongoDB connection..."
if nc -z localhost 27017 2>/dev/null; then
    echo "✓ MongoDB is running on port 27017"
else
    echo "✗ MongoDB is not running on port 27017"
    echo "  Please start MongoDB with: mongod"
    echo ""
    read -p "Continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

echo ""
echo "Building Spring Boot application..."
cd "$(dirname "$0")/fedf_backend_springboot"

# Build the application
mvn clean package -DskipTests -q

if [ $? -ne 0 ]; then
    echo "✗ Build failed!"
    exit 1
fi

echo "✓ Build successful"
echo ""
echo "Starting FEDF Backend on port 8989..."
echo "API Base URL: http://localhost:8989/api"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

# Run the application
java -jar target/fedf-backend-1.0.0.jar

