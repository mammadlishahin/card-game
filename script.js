let cards = ['1', '1', '2', '2', '3', '3', '4', '4', '5', '5'];
let firstCard, secondCard;
let moves = 0;
let matchCount = 0;
let flippedCards = [];
let timer;
let startTime;

function shuffle(array) {
    return array.sort(() => 0.5 - Math.random());
}

function startGame() {
    
    const board = document.querySelector('.game-board');
    board.innerHTML = '';
    moves = 0;
    document.getElementById('moves').textContent = moves;
    document.getElementById('timer').textContent = "00:00";
    matchCount = 0;
    startTime = new Date();
    startTimer();

    shuffle(cards).forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    console.log("salam");
    // bura giribse demek tiklanib
    if (flippedCards.length === 2) return;

    this.classList.add('flipped');
    this.textContent = this.dataset.value;
    flippedCards.push(this);
    this.style.backgroundImage = `url('assets/card${this.textContent}.png')`;

    if (flippedCards.length === 2) {

        moves++;
        document.getElementById('moves').textContent = moves;
        checkForMatch();
    }
}

function checkForMatch() {
    
    const [first, second] = flippedCards;
    if (first.dataset.value === second.dataset.value) {
        matchCount++;
        // BUra giribse demek ikiside eynidi

        if (matchCount === cards.length / 2) {
            clearInterval(timer);
            alert(`Təbriklər! Oyunu ${moves} hərəkətlə bitirdiniz.`);
        }
        flippedCards = [];
    } else {
        setTimeout(() => {
            flippedCards.forEach((crd)=>{
                crd.style.backgroundImage = "url('assets/main.png')";
            })
            first.classList.remove('flipped');
            second.classList.remove('flipped');
            first.textContent = '';
            second.textContent = '';
            flippedCards = [];
        }, 1000);
    }
}

function startTimer() {
    timer = setInterval(() => {
        const now = new Date();
        const elapsed = Math.floor((now - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60).toString().padStart(2, '0');
        const seconds = (elapsed % 60).toString().padStart(2, '0');
        document.getElementById('timer').textContent = `${minutes}:${seconds}`;
    }, 1000);
}

document.addEventListener('DOMContentLoaded', startGame);
