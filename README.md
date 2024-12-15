# Spotify Stats Web App

## Overview

Spotify Stats is a modern web application that lets users explore their Spotify listening habits, including top artists, tracks, and genres, as well as recent tracks. The application prioritizes user privacy and provides comprehensive insights without subscriptions or hidden fees.

## Features

- **User Authentication:** Secure Spotify login using NextAuth.js.
- **Dashboard Insights:** View top artists, tracks, genres, and recent plays.
- **Time Range Filter:** Choose data ranges from 4 weeks, 6 months, or all-time.
- **Responsive Design:** Seamlessly works on all devices.
- **Analytics Integration:** Self-hosted Plausible analytics for privacy-focused tracking.

## Tech Stack

- **Frontend:** React.js, Next.js
- **Authentication:** NextAuth.js
- **Analytics:** Plausible
- **Styling:** Tailwind CSS
- **Fonts:** Google Fonts (Geist, Geist Mono)

## Project Structure

```
├── app
│   ├── page.tsx           # Home Page (Hero and Features sections)
│   ├── layout.tsx         # Global layout with metadata, fonts, navbar, and footer
│   ├── dashboard.tsx      # User dashboard showing Spotify stats
│   └── globals.css        # Global styles
├── components
│   ├── Auth
│   │   └── SessionProviderWrapper.tsx
│   ├── Dashboard
│   │   ├── UserInfo.tsx
│   │   ├── SpotifyInfo.tsx
│   │   ├── SignOutButton.tsx
│   │   └── SpotifyError.tsx
│   ├── Home
│   │   ├── HeroSection.tsx
│   │   └── FeaturesSection.tsx
│   ├── Navbar.tsx
│   └── Footer.tsx
```

## Getting Started

### Prerequisites

- Node.js (version 14 or later)
- Spotify Developer Account

### Installation

1. **Clone the Repository:**

```bash
git clone git@github.com:aydenjahola/spotify-stats.git
cd spotify-stats
```

2. **Install Dependencies:**

```bash
npm install
```

3. **Set Environment Variables:**
   Create a `.env.local` file and add:

```env
SPOTIFY_CLIENT_ID=your_spotify_client_id
SPOTIFY_CLIENT_SECRET=your_spotify_client_secret

NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret
```

4. **Run the Development Server:**

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open issues and pull requests to collaborate.

## Acknowledgements

- Spotify API
- Next.js
- Tailwind CSS
- Plausible Analytics

---

Made with ❤️ by [Ayden](https://github.com/aydenjahola/spotify-stats)
