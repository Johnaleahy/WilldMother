# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a tarot card reading web application built with vanilla JavaScript, HTML, and CSS. The app provides an interactive tarot reading experience with custom card designs and a dark blue theme.

## Architecture

### Project Structure

```
WilldMother/
└── tarot-app/           # Main application directory
    ├── index.html       # Main HTML entry point
    ├── styles.css       # All application styles
    ├── script.js        # Core application logic
    └── cards/
        ├── descriptions.json  # Card metadata (NOT USED - duplicate of embedded data)
        └── images/           # Card images and UI button images
```

### Key Architectural Patterns

**Single-Page Application**: The app is a client-side only SPA with no backend. All functionality is contained in three files: `index.html`, `styles.css`, and `script.js`.

**Data Embedding Strategy**: Card data is embedded directly in [script.js](tarot-app/script.js) to avoid CORS issues when running from the `file://` protocol. The `descriptions.json` file is NOT loaded by the application - it's a duplicate/backup. Always update the embedded `cardsData` object in [script.js](tarot-app/script.js) when modifying card data.

**State Management**: Global state is managed through two variables in [script.js](tarot-app/script.js):
- `currentSpread`: Tracks the active spread type (1 or 4 cards)
- `selectedCards`: Stores the randomly selected cards for the current reading

**UI Flow**:
1. Spread selection screen (image-based buttons)
2. Card area with flippable cards (CSS 3D transforms)
3. Reading area with card descriptions (appears as cards are flipped)
4. Reset button (appears after all cards are flipped)

### Card System

Cards are defined with the following structure:
```javascript
{
  "id": number,
  "name": "Card Name",
  "image": "cards/images/CardName.png",
  "keywords": ["keyword1", "keyword2"],
  "upright": "Description of upright meaning",
  "reversed": "Description of reversed meaning"
}
```

**Note**: The reversed meanings are defined but NOT currently used in the application. The app only displays upright card meanings.

### Spread System

Two spread types are supported:
- **One Card**: Single card reading ("Your Card")
- **Four Card**: Past, Present, Future, Outcome positions

Spread definitions are in `cardsData.spreads` object in [script.js](tarot-app/script.js).

## Running the Application

Since this is a static web application with no build process:

1. **Local Development**: Open [tarot-app/index.html](tarot-app/index.html) directly in a browser
2. **Local Server (recommended)**: Use a simple HTTP server to avoid potential CORS issues:
   ```bash
   cd tarot-app
   python3 -m http.server 8000
   # Then open http://localhost:8000
   ```

## Making Changes

### Adding/Modifying Cards

1. Update the `cardsData.cards` array in [script.js](tarot-app/script.js)
2. Add corresponding card image to [tarot-app/cards/images/](tarot-app/cards/images/)
3. Optionally update [cards/descriptions.json](tarot-app/cards/descriptions.json) if maintaining the backup

### Adding New Spreads

1. Add spread definition to `cardsData.spreads` in [script.js](tarot-app/script.js)
2. Create button image in [cards/images/](tarot-app/cards/images/)
3. Add button to [index.html](tarot-app/index.html) in the `.button-group` section
4. Add event listener in [script.js](tarot-app/script.js) to call `setupSpread(numberOfCards)`

### Styling

All styles are in [styles.css](tarot-app/styles.css). The color scheme uses:
- Background: Dark blue gradient (`#0d1520` to `#1a2838`)
- Accent gold: `#d4b873`, `#c9a961`
- Card teal: `#1a4a55`, `#2d5f6d`

The design is fully responsive with breakpoints at 768px and 480px.

## Important Implementation Details

- **Card flipping**: Uses CSS 3D transforms via the `.flipped` class
- **Fisher-Yates shuffle**: Cards are randomly selected using proper shuffling algorithm
- **Image fallback**: Card images have error handling that displays card name if image fails to load
- **State persistence**: None - refreshing the page resets everything
- **No dependencies**: Pure vanilla JavaScript, no frameworks or libraries
