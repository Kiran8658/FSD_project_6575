#!/bin/bash

# FEDF Backend - Complete Startup Guide
# This script will help you set up and run your Spring Boot backend

echo "🚀 FEDF Backend Startup Helper"
echo "======================================"
echo ""

# Step 1: Check/Install Java
echo "📋 Step 1: Checking Java..."
if command -v java &> /dev/null; then
    java_version=$(java -version 2>&1 | grep version | head -n 1)
    echo "✅ Java is installed: $java_version"
else
    echo "❌ Java is NOT installed"
    echo ""
    echo "Installing Java 17..."
    brew install openjdk@17
    echo "✅ Java installed"
fi

echo ""

# Step 2: Check/Install Maven
echo "📋 Step 2: Checking Maven..."
if command -v mvn &> /dev/null; then
    mvn_version=$(mvn --version 2>&1 | head -n 1)
    echo "✅ Maven is installed: $mvn_version"
else
    echo "❌ Maven is NOT installed"
    echo ""
    echo "Installing Maven..."
    brew install maven
    echo "✅ Maven installed"
fi

echo ""

# Step 3: Check MongoDB
echo "📋 Step 3: Checking MongoDB..."
if pgrep -f mongod > /dev/null; then
    echo "✅ MongoDB is running"
else
    echo "⚠️  MongoDB is NOT running"
    echo ""
    echo "To start MongoDB:"
    echo "  brew services start mongodb-community"
    echo ""
    read -p "Start MongoDB now? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        brew services start mongodb-community
        sleep 2
        if pgrep -f mongod > /dev/null; then
            echo "✅ MongoDB started successfully"
        fi
    fi
fi

echo ""
echo "======================================"
echo "🎯 Ready to run backend!"
echo ""
echo "Navigate to backend directory:"
echo "  cd /Users/kiran/2_2sem/fedf_project/fedf_backend_springboot"
echo ""
echo "Run the backend:"
echo "  mvn clean install"
echo "  mvn spring-boot:run"
echo ""
echo "Or run in one command:"
echo "  mvn clean install && mvn spring-boot:run"
echo ""
echo "Server will start on: http://localhost:8080"
echo ""

