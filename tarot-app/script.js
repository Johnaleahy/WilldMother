// Card data embedded directly to avoid CORS issues with file:// protocol
const cardsData = {
  "cards": [
    {
      "id": 0,
      "name": "The Wanderer",
      "image": "cards/images/TheWanderer.png",
      "keywords": ["journey", "exploration", "discovery", "seeking"],
      "upright": "The Wanderer represents a journey into the unknown, exploration of new paths, and the courage to seek truth beyond familiar boundaries. This card encourages you to embrace adventure and trust your path.",
      "reversed": "Reversed, The Wanderer can indicate feeling lost, aimless wandering, or fear of stepping into the unknown."
    },
    {
      "id": 1,
      "name": "The Tower",
      "image": "cards/images/TheTower.png",
      "keywords": ["sudden change", "upheaval", "revelation", "breakthrough"],
      "upright": "The Tower represents sudden change, upheaval, and revelation. Old structures must crumble for new ones to be built. This is a powerful transformation card.",
      "reversed": "Reversed, The Tower can indicate avoiding necessary change, fear of transformation, or delaying the inevitable."
    },
    {
      "id": 2,
      "name": "The Hollow",
      "image": "cards/images/TheHollow.png",
      "keywords": ["emptiness", "void", "potential", "stillness"],
      "upright": "The Hollow represents emptiness that holds infinite potential, the void before creation, and the power of stillness. Sometimes we must empty ourselves to be filled anew.",
      "reversed": "Reversed, The Hollow can indicate feeling empty without purpose, depression, or inability to move forward."
    },
    {
      "id": 3,
      "name": "The Mother",
      "image": "cards/images/TheMother.png",
      "keywords": ["nurturing", "abundance", "protection", "creation"],
      "upright": "The Mother represents nurturing energy, abundance, protection, and the power of creation. She embodies unconditional love and the cycle of life.",
      "reversed": "Reversed, The Mother can indicate smothering, codependency, or neglecting self-care."
    },
    {
      "id": 4,
      "name": "The Lovers",
      "image": "cards/images/TheLovers.png",
      "keywords": ["love", "union", "choice", "harmony"],
      "upright": "The Lovers represent deep connection, meaningful relationships, important choices, and harmony. This card speaks of union and alignment of values.",
      "reversed": "Reversed, The Lovers can indicate disharmony, difficult choices, or misalignment in relationships."
    },
    {
      "id": 5,
      "name": "The Sorceress",
      "image": "cards/images/theSorceress.png",
      "keywords": ["magic", "power", "wisdom", "transformation"],
      "upright": "The Sorceress represents magical power, deep wisdom, and the ability to transform reality. She knows the secrets of the universe and wields them with skill.",
      "reversed": "Reversed, The Sorceress can indicate manipulation, misuse of power, or blocked creative energy."
    },
    {
      "id": 6,
      "name": "The High Priestess",
      "image": "cards/images/TheHighPriestess.png",
      "keywords": ["intuition", "mystery", "divine feminine", "inner knowing"],
      "upright": "The High Priestess represents intuition, sacred knowledge, mystery, and the divine feminine. She guards the threshold between the conscious and unconscious realms.",
      "reversed": "Reversed, The High Priestess can indicate disconnection from intuition, hidden agendas, or repressed feelings."
    },
    {
      "id": 7,
      "name": "Justice",
      "image": "cards/images/Justice.png",
      "keywords": ["balance", "fairness", "truth", "karma"],
      "upright": "Justice represents balance, fairness, truth, and karmic consequences. This card reminds us that all actions have reactions, and truth will prevail.",
      "reversed": "Reversed, Justice can indicate unfairness, bias, dishonesty, or avoiding accountability."
    }
  ],
  "spreads": {
    "one-card": {
      "name": "Single Card",
      "positions": ["Your Card"]
    },
    "four-card": {
      "name": "Four Card Spread",
      "positions": ["Past", "Present", "Future", "Outcome"]
    }
  }
};

// Global variables
let currentSpread = null;
let selectedCards = [];

// DOM elements
const spreadSelection = document.getElementById('spread-selection');
const oneCardBtn = document.getElementById('one-card-btn');
const fourCardBtn = document.getElementById('four-card-btn');
const cardArea = document.getElementById('card-area');
const cardsContainer = document.getElementById('cards-container');
const positionLabels = document.getElementById('position-labels');
const readingArea = document.getElementById('reading-area');
const cardDescriptions = document.getElementById('card-descriptions');
const resetContainer = document.getElementById('reset-container');
const resetBtn = document.getElementById('reset-btn');

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Select random cards from deck
function selectCards(count) {
    const shuffled = shuffleArray(cardsData.cards);
    return shuffled.slice(0, count);
}

// Create card element
function createCardElement(index) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.index = index;

    card.innerHTML = `
        <div class="card-inner">
            <div class="card-face card-back">
                <img src="cards/images/Back.png" alt="Card Back" style="width:100%;height:100%;object-fit:cover;border-radius:8px;">
            </div>
            <div class="card-face card-front">
                <img src="${selectedCards[index].image}" alt="${selectedCards[index].name}"
                     onerror="this.parentElement.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;padding:10px;text-align:center;color:#8b4513;\\'>${selectedCards[index].name}</div>'">
            </div>
        </div>
    `;

    // Add click event to flip card
    card.addEventListener('click', () => flipCard(card, index));

    return card;
}

// Flip card and show description
function flipCard(cardElement, index) {
    if (cardElement.classList.contains('flipped')) {
        return; // Card already flipped
    }

    cardElement.classList.add('flipped');

    // Wait for animation to complete, then show description
    setTimeout(() => {
        showCardDescription(index);
    }, 600);
}

// Show card description
function showCardDescription(index) {
    const card = selectedCards[index];
    const spreadType = currentSpread === 1 ? 'one-card' : 'four-card';
    const position = cardsData.spreads[spreadType].positions[index];

    const descriptionElement = document.createElement('div');
    descriptionElement.className = 'card-description';
    descriptionElement.innerHTML = `
        <h3>${card.name}</h3>
        <div class="position">${position}</div>
        <div class="keywords"><strong>Keywords:</strong> ${card.keywords.join(', ')}</div>
        <div class="meaning">${card.upright}</div>
    `;

    cardDescriptions.appendChild(descriptionElement);

    // Show reading area if hidden
    if (readingArea.classList.contains('hidden')) {
        readingArea.classList.remove('hidden');
    }

    // Show reset button once all cards are flipped
    const allFlipped = document.querySelectorAll('.card.flipped').length === currentSpread;
    if (allFlipped && resetContainer.classList.contains('hidden')) {
        resetContainer.classList.remove('hidden');
    }
}

// Setup spread
function setupSpread(spreadType) {
    currentSpread = spreadType;
    const spreadKey = spreadType === 1 ? 'one-card' : 'four-card';
    const positions = cardsData.spreads[spreadKey].positions;

    // Select random cards
    selectedCards = selectCards(spreadType);

    // Hide spread selection
    spreadSelection.classList.add('hidden');

    // Show card area
    cardArea.classList.remove('hidden');

    // Clear previous content
    positionLabels.innerHTML = '';
    cardsContainer.innerHTML = '';
    cardDescriptions.innerHTML = '';

    // Create position labels
    positions.forEach(position => {
        const label = document.createElement('div');
        label.className = 'position-label';
        label.textContent = position;
        positionLabels.appendChild(label);
    });

    // Create cards
    for (let i = 0; i < spreadType; i++) {
        const card = createCardElement(i);
        cardsContainer.appendChild(card);
    }
}

// Reset reading
function resetReading() {
    // Hide everything
    cardArea.classList.add('hidden');
    readingArea.classList.add('hidden');
    resetContainer.classList.add('hidden');

    // Show spread selection
    spreadSelection.classList.remove('hidden');

    // Clear data
    currentSpread = null;
    selectedCards = [];
    positionLabels.innerHTML = '';
    cardsContainer.innerHTML = '';
    cardDescriptions.innerHTML = '';
}

// Event listeners
oneCardBtn.addEventListener('click', () => setupSpread(1));
fourCardBtn.addEventListener('click', () => setupSpread(4));
resetBtn.addEventListener('click', resetReading);
