#!/bin/bash

# Deploy Taraweeh App to Vercel

echo "Deploying Taraweeh App to Vercel..."

# Make sure we're using the latest npm packages
echo "Installing dependencies..."
npm install

# Build the app for Vercel (without GitHub Pages base path)
echo "Building for Vercel..."
npm run build

# Deploy to Vercel
echo "Deploying to Vercel..."
npx vercel --prod

echo "Deployment complete! Your app should now be available on Vercel." 