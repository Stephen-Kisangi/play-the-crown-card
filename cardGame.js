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
}
