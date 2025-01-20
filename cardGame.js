// Card object constructor
function Card(suit, value) {
    this.suit = suit;
    this.value = value;
}

// Global variable to store the drawn card
let drawnCard = null;

// Function to draw a random card
function drawCard() {
    const suits = ['club', 'diamond', 'heart', 'spade'];
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const value = Math.floor(Math.random() * 13) + 1; // Value between 1 and 13

    drawnCard = new Card(suit, value);

    // Notify the user that a new card has been drawn
    const message = document.querySelector('.feedback');
    message.innerText = 'A new card has been drawn! Make your guess!';
    message.style.color = 'green';

    // Optionally display the card in the console for debugging
    console.log(`Drawn card: ${drawnCard.suit} ${drawnCard.value}`);

     gtag('event', 'draw_card', {
        'event_category': 'Game Interaction',
        'event_label': `${drawnCard.value} of ${drawnCard.suit}`,
        'value': 1  // Optional value, can represent the action's significance or the number of draws
    });
}

// Function to check the user's guess
function checkGuess() {
    const guessedSuit = document.getElementById('suitGuess').value;
    const guessedValue = parseInt(document.getElementById('valueGuess').value);

    const message = document.querySelector('.feedback');

    if (!drawnCard) {
        message.innerText = 'You need to draw a card first!';
        message.style.color = 'red';
        return;
    }

    // Check if the guess is correct
    if (guessedSuit === drawnCard.suit && guessedValue === drawnCard.value) {
        message.innerText = '🎉 You guessed correctly! Great job!';
        message.style.color = 'darkblue';
    } else {
        message.innerText = '❌ Better luck next time! Keep trying!';
        message.style.color = 'darkred';
    }
    // Track Guess Check Event in Google Analytics
    gtag('event', 'check_guess', {
        'event_category': 'Game Interaction',
        'event_label': `${guessedValue} of ${guessedSuit}`,
        'guessed_value': guessedValue,
        'guessed_suit': guessedSuit
    });

    if (guessedSuit === drawnCard.suit && guessedValue === drawnCard.value) {
        document.querySelector('h1').innerText = 'You got it!';
        // Track Correct Guess Event
        gtag('event', 'correct_guess', {
            'event_category': 'Game Interaction',
            'event_label': 'Correct Guess'
        });
    } else {
        document.querySelector('h1').innerText = 'Better Luck Next Time!';
        // Track Incorrect Guess Event
        gtag('event', 'incorrect_guess', {
            'event_category': 'Game Interaction',
            'event_label': 'Incorrect Guess'
        });
    }
}


// Track page load time
window.onload = function () {
    const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    gtag('event', 'timing_complete', {
        'name': 'page_load',
        'value': pageLoadTime,
        'event_category': 'Performance',
        'event_label': 'Page Load Time'
    });
};


// Track Button Click Event
document.querySelector('button').addEventListener('click', function() {
    gtag('event', 'button_click', {
        'event_category': 'UI Interaction',
        'event_label': 'Draw Card Button Click'
    });
});