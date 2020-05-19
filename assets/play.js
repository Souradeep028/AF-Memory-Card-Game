// let backgroundMusic = new Audio('./assets/sound/background.ogg');
// backgroundMusic.volume = 0.5;
// backgroundMusic.loop = true;

let flipSound = new Audio('./assets/sound/flip.ogg');
let matchSound = new Audio('./assets/sound/match.ogg');
let notMatchSound = new Audio('./assets/sound/notmatch.ogg');

const cards = document.querySelectorAll('.cards');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cardLeft = cards.length;
let interval = null;
let flip = 0;

function flipCard() {
    flipSound.play();

    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    ++flip;
    document.getElementById('flip').innerHTML=flip;
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;

        return;
    }
    secondCard = this;
    checkForMatch();
    isFinish();
}

function isFinish() {
    if (cardLeft === 0) {
        // backgroundMusic.pause();
        clearInterval(interval);
        setInterval(()=>window.location.assign('end.html'), 2000)
    }
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    matchSound.play();

    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    cardLeft -= 2;
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    notMatchSound.play();

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function time() {
    let x = 60;
    interval = setInterval(() => {
        document.getElementById('time-remaining').innerHTML = x;
        window.localStorage.setItem('currentTime', x);
        --x;
        if(x==0) window.location.assign('end.html')
    }, 1000);
}

function startGame() {
    // backgroundMusic.play();

    time();

    shuffleCards();

    // add event for each card can clicked
    cards.forEach(card => card.addEventListener('click', flipCard));
}

startGame();