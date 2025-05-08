# Taraweeh Recitations App

A web and mobile application for accessing Taraweeh recitations from Makkah and Madinah, covering years 1426-1442 Hijri.

## Features

- Browse recitations from both Makkah and Madinah
- Filter by Hijri year (1426-1442)
- Beautiful responsive UI for mobile and desktop 
- Custom audio player with play/pause/next/previous controls
- PWA support for iOS home screen installation
- Works offline after initial load

## Live Demo

Try the PWA version at [taraweeh-app.github.io](https://taraweeh-app.github.io)

## Technologies Used

- Next.js 15 with TypeScript
- React 19
- TailwindCSS
- React H5 Audio Player
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

## Installing as a PWA on iOS

The app can be installed as a Progressive Web App on iOS, allowing it to function like a native app without requiring App Store submission:

1. Open the app in Safari on your iOS device
2. Tap the Share button (box with up arrow) at the bottom of the screen
3. Scroll down and tap "Add to Home Screen"
4. Name the app "Taraweeh" (or your preferred name)
5. Tap "Add" in the top right corner

The app will now appear on your home screen with its icon, and will launch in fullscreen mode without the Safari browser interface.

## Offline Functionality

Once installed as a PWA, the app can work offline:
- The basic app interface will load without an internet connection
- Previously accessed recitations will be available offline
- New recitations require internet access to stream or download

## Data Source

The app uses QuranicAudio.com API to fetch recitations from:
- Makkah Al-Mukarramah Taraweeh (1426-1442 Hijri)
- Madinah Al-Munawwarah Taraweeh (1426-1442 Hijri)

## License

MIT

## Acknowledgments

- [QuranicAudio.com](https://quranicaudio.com/) for providing the recitation audio
- The developers of React H5 Audio Player
