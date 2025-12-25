# Glam Salon Booking System

A modern, responsive salon booking application built with React and Vite.

## Features

- 📋 Browse and search salon services
- 👤 Select preferred staff member
- 📅 Choose appointment date and time
- ✅ Complete booking with client details
- 📱 View and manage appointments

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Lucide React** - Icon library
- **CSS** - Custom styling

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── api/              # API service layer
├── components/       # Reusable UI components
│   ├── common/       # Generic components
│   ├── services/     # Service-related components
│   ├── staff/        # Staff-related components
│   ├── booking/      # Booking-related components
│   └── layout/       # Layout components
├── context/          # React Context providers
├── data/             # Mock data
├── hooks/            # Custom hooks
├── pages/            # Page components
├── utils/            # Utility functions
└── styles/           # CSS styles
```

## License

© 2025 Glam Salon. All rights reserved.
