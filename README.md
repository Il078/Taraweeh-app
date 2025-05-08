# Taraweeh Recitations App

A web application to browse and listen to Taraweeh recitations from the Two Sacred Mosques (Makkah and Madinah) for Hijri years 1426-1442.

## Features

- Browse recitations by year and location (Makkah or Madinah)
- Listen to Surah recitations using an embedded audio player
- Responsive design for mobile and desktop
- Beautiful green and white UI theme
- Automatic fallback URL pattern support for QuranicAudio files

## Technologies Used

- Next.js 15.3
- React 19
- Tailwind CSS 4
- React H5 Audio Player

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/Il078/Taraweeh-app.git
cd taraweeh-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment

This app can be deployed on Vercel, Netlify, or any other platform that supports Next.js.

```bash
npm run build
npm run start
```

## Data Source

All audio files are sourced from [QuranicAudio.com](https://quranicaudio.com/).

## License

MIT

## Acknowledgments

- [QuranicAudio.com](https://quranicaudio.com/) for providing the recitation audio
- The developers of React H5 Audio Player
