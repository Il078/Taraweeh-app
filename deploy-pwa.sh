#!/bin/bash
# Deployment script for Taraweeh PWA

echo "Building Taraweeh PWA..."
npm run build

# Check if build was successful
if [ $? -ne 0 ]; then
  echo "Build failed!"
  exit 1
fi

echo "Build successful. Static files are in the 'out' directory."
echo "To deploy to a web server:"
echo "1. Upload the contents of the 'out' directory to your web server"
echo "2. Ensure your web server is configured to serve HTTPS (required for PWA)"
echo "3. iOS users can access the app via Safari and add to home screen"

# Instructions for local testing
echo ""
echo "For local testing:"
echo "cd out && npx serve"
echo "Then visit http://localhost:3000 from your mobile device on the same network"

# Instructions for adding to home screen
echo ""
echo "Instructions for iOS users:"
echo "1. Open the app URL in Safari"
echo "2. Tap the Share button (box with arrow pointing up)"
echo "3. Scroll down and tap 'Add to Home Screen'"
echo "4. Give it a name and tap 'Add'"
echo "5. The app will now appear on your home screen with an icon"
echo ""
echo "The app should now work offline and have a native-like experience!" 