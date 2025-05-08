# Taraweeh Recitations App

A web and mobile application for accessing Taraweeh recitations from Makkah and Madinah, covering years 1426-1442 Hijri.

## Features

- Browse recitations from both Makkah and Madinah
- Filter by Hijri year (1426-1442)
- Beautiful responsive UI for mobile and desktop 
- Custom audio player with play/pause/next/previous controls
- PWA support for iOS home screen installation
- Works offline after initial load
- Capacitor support for building native iOS and Android apps

## Live Demo

Try the PWA version at [taraweeh-app.github.io](https://taraweeh-app.github.io)

## Technologies Used

- Next.js 15 with TypeScript
- React 19
- TailwindCSS
- React H5 Audio Player
- Capacitor for native mobile builds
- Progressive Web App capabilities

## Development

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
git clone https://github.com/your-username/taraweeh-app.git
cd taraweeh-app
npm install
```

### Running Locally

```bash
npm run dev
```

### Building

```bash
npm run build
```

## Mobile Apps

### PWA Setup

The app can be installed as a PWA on iOS:

1. Open the app in Safari
2. Tap the Share button (box with up arrow)
3. Tap "Add to Home Screen"
4. Name it and tap "Add"

### Native App Setup (with Capacitor)

```bash
# Build the app
npm run build

# Sync with Capacitor
npx cap sync

# Open in Xcode for iOS
npx cap open ios

# Open in Android Studio
npx cap open android
```

## Data Source

The app uses QuranicAudio.com API to fetch recitations from:
- Makkah Al-Mukarramah Taraweeh (1426-1442 Hijri)
- Madinah Al-Munawwarah Taraweeh (1426-1442 Hijri)

## License

MIT

## Acknowledgments

- [QuranicAudio.com](https://quranicaudio.com/) for providing the recitation audio
- The developers of React H5 Audio Player
