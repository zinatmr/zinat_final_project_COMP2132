let playerTotalScore = 0;
let computerTotalScore = 0;
let rollCount = 0;

document.addEventListener('DOMContentLoaded', (event) => {
    addHowToPlaySection();
    addRulesSection();
    hideElementsInitially();
});

function addHowToPlaySection() {
    const howToPlaySection = document.getElementById('how-to-play-section');
    howToPlaySection.innerHTML = `
        <section class="decoration">
            <div class="section-header">
                <h3>How to Play</h3>
                <button id="how-to-play-show-hide" class="show-hide-button" onclick="toggleVisibility('how-to-play-list')">Hide</button>
            </div>
            <ul id="how-to-play-list">
                <li>To start, click the "Roll Dice" button.</li>
                <li>To advance to the next round, click the "Roll Dice" button again.</li>
                <li>After three rounds, the game is over and the final score is calculated.</li>
                <li>If you want to play again, click the 'New Game' button or refresh the page.</li>
            </ul>
            <hr>
        </section>
    `;
}

function addRulesSection() {
    const rulesSection = document.getElementById('rules-section');
    rulesSection.innerHTML = `
        <section class="decoration">
            <div class="section-header">
                <h3>Rules</h3>
                <button id="rules-show-hide" class="show-hide-button" onclick="toggleVisibility('rules-list')">Hide</button>
            </div>
            <ul id="rules-list">
                <li>Each round, you and the computer both roll a pair of dice.</li>
                <li>Your score for that round will be based on the sum of the dice.</li>
                <li>If you roll doubles (e.g. a 3 and a 3), then your score is multiplied by 2.</li>
                <li>Rolling a 1 will give you a score of 0 for that round.</li>
                <li>The player who has the most points at the end of three rounds is the winner.</li>
            </ul>
            <hr>
        </section>
    `;
}

function toggleVisibility(elementId) {
    const element = document.getElementById(elementId);
    const button = element.previousElementSibling.querySelector('.show-hide-button');
    if (element.style.display === 'none') {
        element.style.display = 'block';
        button.textContent = 'Hide';
    } else {
        element.style.display = 'none';
        button.textContent = 'Show';
    }
}

function rollDice() {
    if (rollCount >= 3) {
        return;
    }

    rollCount++;

    let playerDice1 = getRandomDice();
    let playerDice2 = getRandomDice();
    let computerDice1 = getRandomDice();
    let computerDice2 = getRandomDice();

    let playerRoundScore = calculateScore(playerDice1, playerDice2);
    let computerRoundScore = calculateScore(computerDice1, computerDice2);

    playerTotalScore += playerRoundScore;
    computerTotalScore += computerRoundScore;

    document.getElementById('player-dice1-value').textContent = getDiceEmoji(playerDice1);
    document.getElementById('player-dice2-value').textContent = getDiceEmoji(playerDice2);
    document.getElementById('computer-dice1-value').textContent = getDiceEmoji(computerDice1);
    document.getElementById('computer-dice2-value').textContent = getDiceEmoji(computerDice2);

    document.getElementById('player-round-score').textContent = `Round Score: ${playerRoundScore}`;
    document.getElementById('computer-round-score').textContent = `Round Score: ${computerRoundScore}`;

    document.getElementById('player-total-score').textContent = `Total Score: ${playerTotalScore}`;
    document.getElementById('computer-total-score').textContent = `Total Score: ${computerTotalScore}`;

    showGameElements();

    if (rollCount === 3) {
        displayResult();
    }
}

function getRandomDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function getDiceEmoji(value) {
    const diceEmojis = ['\u2680', '\u2681', '\u2682', '\u2683', '\u2684', '\u2685'];
    return diceEmojis[value - 1];
}

function calculateScore(dice1, dice2) {
    if (dice1 === 1 || dice2 === 1) {
        return 0;
    } else if (dice1 === dice2) {
        return (dice1 + dice2) * 2;
    } else {
        return dice1 + dice2;
    }
}

function displayResult() {
    let resultMessage;
    if (playerTotalScore > computerTotalScore) {
        resultMessage = 'Congratulations! You won!';
    } else if (computerTotalScore > playerTotalScore) {
        resultMessage = 'Computer won!';
    } else {
        resultMessage = "It's a draw!";
    }
    document.getElementById('popup-message').textContent = resultMessage;
    document.getElementById('popup').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    document.querySelector('.game-container').style.opacity = '0.5';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
    document.querySelector('.game-container').style.opacity = '1';
}

function newGame() {
    playerTotalScore = 0;
    computerTotalScore = 0;
    rollCount = 0;

    document.getElementById('player-dice1-value').textContent = '\u{1F3B2}';
    document.getElementById('player-dice2-value').textContent = '\u{1F3B2}';
    document.getElementById('computer-dice1-value').textContent = '\u{1F3B2}';
    document.getElementById('computer-dice2-value').textContent = '\u{1F3B2}';

    document.getElementById('player-round-score').textContent = 'Round Score: 0';
    document.getElementById('computer-round-score').textContent = 'Round Score: 0';

    document.getElementById('player-total-score').textContent = 'Total Score: 0';
    document.getElementById('computer-total-score').textContent = 'Total Score: 0';

    hideElementsInitially();

    document.getElementById('result').textContent = '';
    document.getElementById('roll-button').disabled = false;

    closePopup();
}

function hideElementsInitially() {
    document.getElementById('player-dice1-value').style.visibility = 'hidden';
    document.getElementById('player-dice2-value').style.visibility = 'hidden';
    document.getElementById('computer-dice1-value').style.visibility = 'hidden';
    document.getElementById('computer-dice2-value').style.visibility = 'hidden';
    document.getElementById('player-round-score').style.visibility = 'hidden';
    document.getElementById('computer-round-score').style.visibility = 'hidden';
    document.getElementById('player-total-score').style.visibility = 'hidden';
    document.getElementById('computer-total-score').style.visibility = 'hidden';
}

function showGameElements() {
    document.getElementById('player-dice1-value').style.visibility = 'visible';
    document.getElementById('player-dice2-value').style.visibility = 'visible';
    document.getElementById('computer-dice1-value').style.visibility = 'visible';
    document.getElementById('computer-dice2-value').style.visibility = 'visible';
    document.getElementById('player-round-score').style.visibility = 'visible';
    document.getElementById('computer-round-score').style.visibility = 'visible';
    document.getElementById('player-total-score').style.visibility = 'visible';
    document.getElementById('computer-total-score').style.visibility = 'visible';
}