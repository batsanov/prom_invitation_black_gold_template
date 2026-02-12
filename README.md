# Wedding Invitation Template

A beautiful, elegant wedding invitation website template built with React, TypeScript, Tailwind CSS, and Firebase. Perfect for creating personalized wedding websites for multiple clients.

## 📋 Quick Start for New Clients

**For AI Agents & Developers:** This template is designed for rapid deployment for multiple clients. Choose your setup method:

### 🤖 Automated Setup
- **PowerShell (Windows):** `.\setup-client.ps1 -ClientName "maria-ivan" -BrideName "Мария" -GroomName "Иван" -WeddingDate "2026-08-15"`
- **Bash (Mac/Linux):** `./setup-client.sh maria-ivan "Мария" "Иван" "2026-08-15"`

### 📚 Manual Setup Guides
- **[DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)** - 🆕 **Start here!** Run locally without Firebase, then add it when ready
- **[AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md)** - Complete step-by-step guide for AI agents (60-70 min)
- **[QUICK_SETUP.md](QUICK_SETUP.md)** - Quick checklist format for experienced users (45 min)
- **[FIREBASE_SETUP.md](FIREBASE_SETUP.md)** - Detailed Firebase configuration troubleshooting

### 🔧 Configuration Template
- **[client-config.template.json](client-config.template.json)** - JSON template for tracking client deployments

---

## ✨ Features

- **Elegant Design**: Beige, white, and champagne color palette with Frangipani flower accents
- **Responsive**: Looks beautiful on all devices
- **Smooth Animations**: Powered by Framer Motion
- **RSVP Form**: Full-featured form with Firebase Firestore storage
- **Admin Dashboard**: Real-time RSVP management at `/dashboard`
- **Countdown Timer**: Live countdown to the wedding day
- **Location Maps**: Interactive Google Maps integration
- **Our Story Timeline**: Beautiful timeline of the couple's journey

## 🚀 Quick Development Setup

### Option 1: Development Mode (No Firebase - Recommended for Getting Started)

1. Clone/copy this template
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy development environment:
   ```bash
   Copy-Item .env.development .env   # Windows PowerShell
   # OR
   cp .env.development .env          # Mac/Linux
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173 in your browser

✅ **You're ready to develop!** RSVPs will work but data won't persist (stored in memory only).

### Option 2: Production Mode (With Firebase)

When you're ready to deploy and need real data persistence:

1. Follow steps 1-2 above
2. Set up Firebase (see [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md) for detailed instructions)
3. Create `.env` with your Firebase credentials
4. Start the development server: `npm run dev`

📖 **Full instructions in [DEVELOPMENT_GUIDE.md](DEVELOPMENT_GUIDE.md)**

---

### Prerequisites

- Node.js 18+ installed
- npm or yarn
- Firebase account (only needed for production mode)

## 🔥 Firebase Setup (Required)

This template uses **Firebase Firestore** for RSVP storage and real-time updates.

### Quick Setup:
1. Create Firebase project at https://console.firebase.google.com/
2. Enable Firestore Database
3. Deploy security rules (see `firestore.rules`)
4. Add credentials to `.env` file

**See [FIREBASE_SETUP.md](FIREBASE_SETUP.md) for detailed instructions with troubleshooting.**

## 📧 Environment Variables

Required variables in `.env`:

```env
VITE_FIREBASE_API_KEY=your_api_key
# Prefer VITE_FIREBASE_DOMAIN to avoid platform warnings about exposing "AUTH" variables.
VITE_FIREBASE_DOMAIN=your_firebase_app_domain
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🎨 Customization

### Wedding Details (Primary Customization)
Edit `src/config/weddingConfig.ts` with client information:
```typescript
export const weddingConfig = {
  couple: {
    bride: "Client Bride Name",
    groom: "Client Groom Name",
  },
  wedding: {
    date: "2026-08-15",  // YYYY-MM-DD format
    time: "14:00",       // 24-hour format
  },
  locations: {
    ceremony: {
      name: "Ceremony Venue Name",
      address: "Full Address",
      mapUrl: "Google Maps URL",
      time: "14:00",
    },
    reception: {
      name: "Reception Venue Name",
      address: "Full Address",
      mapUrl: "Google Maps URL",
      time: "16:00",
    },
  },
  // ... customize other sections as needed
};
```

### Colors (Optional)
Edit `src/index.css` to modify the color palette:
```css
@theme {
  --color-beige: #F5F5DC;
  --color-champagne: #F7E7CE;
  --color-frangipani: #FEF9E7;
  --color-gold: #D4AF37;
  /* ... */
}
```

### Images
Replace placeholder images with client photos:
- Add images to `src/assets/` or `public/` folder
- Update image URLs in wedding config or components

## 📱 Website Sections

1. **Hero** - Full-screen welcome with couple names and date
2. **Countdown** - Real-time countdown to the wedding day
3. **Our Story** - Customizable timeline of the couple's journey
4. **Location** - Ceremony & reception with interactive maps
5. **Schedule** - Day-of timeline for guests
6. **RSVP** - Full-featured form with Firebase integration
7. **Footer** - Contact info and customizable details
8. **Admin Dashboard** (`/dashboard`) - Real-time RSVP management

## 🏗️ Building for Production

```bash
npm run build
```

The built files will be in the `dist/` folder, ready to deploy.

## 🌐 Deployment to Vercel (Recommended)

### Option 1: Vercel Dashboard
1. Push code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables from `.env`
5. Deploy!

### Option 2: Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

**Important:** Add all `VITE_*` environment variables in Vercel Dashboard → Settings → Environment Variables.

See [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) for complete deployment instructions.

## 📊 Admin Dashboard

Access the admin dashboard at `[your-url]/dashboard` to:
- View all RSVP submissions in real-time
- See attendance statistics
- Export RSVP data
- Monitor responses as they come in

Protected with Firebase Authentication. Only signed-in users can read RSVP data (see `firestore.rules`).

## 📁 Project Structure

```
src/
├── components/
│   ├── Home.tsx           # Main page layout
│   ├── Hero.tsx           # Hero section
│   ├── Countdown.tsx      # Countdown timer
│   ├── OurStory.tsx       # Story timeline
│   ├── Location.tsx       # Venue maps
│   ├── Schedule.tsx       # Day schedule
│   ├── RSVPForm.tsx       # RSVP form
│   ├── Dashboard.tsx      # Admin dashboard
│   ├── Navbar.tsx         # Navigation
│   └── Footer.tsx         # Footer
├── config/
│   ├── firebase.ts        # Firebase initialization
│   └── weddingConfig.ts   # Client wedding details
├── utils/
│   └── firebaseService.ts # Firestore operations
├── types.ts              # TypeScript definitions
├── App.tsx               # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles with Tailwind

Configuration Files:
├── firestore.rules        # Firebase security rules
├── .env.example          # Environment template
├── AI_DEPLOYMENT_GUIDE.md # Complete deployment guide
├── QUICK_SETUP.md        # Quick setup checklist
├── FIREBASE_SETUP.md     # Firebase troubleshooting
├── setup-client.ps1      # Windows automation script
└── setup-client.sh       # Mac/Linux automation script
```

## 🔄 Multi-Client Workflow

This template is designed for agencies/developers managing multiple client websites:

1. **Fork/Copy** this template for each new client
2. **Customize** `weddingConfig.ts` and `.env` for each client
3. **Deploy** each client to separate Firebase and Vercel projects
4. **Manage** multiple deployments easily with consistent structure

Each client gets:
- ✅ Dedicated Firebase project
- ✅ Dedicated Vercel deployment
- ✅ Unique admin dashboard
- ✅ Independent RSVP database
- ✅ Custom domain support

## 🐛 Troubleshooting

### RSVP Form Stuck on "Изпращане..." (Sending)?
- **Cause:** Firestore security rules not configured
- **Fix:** See [FIREBASE_SETUP.md](FIREBASE_SETUP.md)

### Firebase Permission Denied
- Check Firestore rules allow `create: if true` for `rsvps` collection
- Verify environment variables are set correctly

### Build Errors
- Run `npm install` to ensure dependencies are installed
- Check that all environment variables start with `VITE_`
- Test locally with `npm run dev`

See [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) for complete troubleshooting guide.

## 📝 License

This is a commercial template. Customize freely for your clients.

## 💕 Support

For setup assistance or custom features, refer to:
- [AI_DEPLOYMENT_GUIDE.md](AI_DEPLOYMENT_GUIDE.md) - Complete guide for AI agents
- [QUICK_SETUP.md](QUICK_SETUP.md) - Quick reference checklist
- [FIREBASE_SETUP.md](FIREBASE_SETUP.md) - Firebase-specific help

---

**Built with:** React • TypeScript • Tailwind CSS • Firebase • Framer Motion • Vite

**Perfect for:** Wedding Planners • Design Agencies • Freelance Developers • Couples
