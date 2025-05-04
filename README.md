# NoteStory

NoteStory is an interactive web application that transforms text into musical notation. The app identifies words composed of musical note letters (A-G) and renders them as actual notes on a musical staff.

## Features

- Converts words consisting of A-G letters into musical notation
- Configurable clef selection (treble, bass, or both)
- Adjustable ledger lines to control note range 
- Real-time rendering as you type
- Built with React, TypeScript, and VexFlow

## How It Works

The application scans your text for words containing only the letters A through G (matching musical notes). When it finds a matching word (minimum 2 characters), it converts each letter to its corresponding musical note and displays it on a staff. For example:

- "CABBAGE" becomes a sequence of C, A, B, B, A, G, E notes
- "BEE" becomes B, E, E notes
- "FADE" becomes F, A, D, E notes

The first note in each word appears as a whole note, making it visually distinct.

## Getting Started

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Configuration Options

- **Clef Selection**: Choose between treble clef, bass clef, or both (randomly selected per word)
- **Ledger Lines**: Adjust the maximum number of ledger lines (0-3) to control the range of notes displayed

## Technology Stack

- React 19
- TypeScript
- TailwindCSS
- VexFlow (music notation rendering)
- Vite
- Vitest