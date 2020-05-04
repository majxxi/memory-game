const cards = document.querySelectorAll('.main-card');
let flipCount = document.getElementById("flip-count");
let flipRecord = document.getElementById('flip-record');
let deck = Array.from(document.getElementsByClassName('main-card'));

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

let count = 0;

function flipCard(){
    if(lockBoard) return;
    if(this === firstCard) return;
    this.classList.add("flip");

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        count++;
        flipCount.innerHTML = count;
        return;
    } 
    secondCard = this;
    count++;
    flipCount.innerHTML = count;
    checkForMatch();
}


let matched = 0;

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
  }

  function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matched++;
    if(matched === 12){
        document.getElementById('finish-text').classList.add('visible');
        if(count < flipRecord.innerHTML || flipRecord.innerHTML === "0" ){
            flipRecord.innerHTML = count;
        }
    }
    resetBoard();
  }

var highscore = localStorage.getItem("highscore");

if(highscore !== null){
    if (count > highscore) {
        localStorage.setItem("highscore", count);      
    }
}
else{
    localStorage.setItem("highscore", count);
}
  
  function unflipCards() {
    lockBoard = true;
  
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

cards.forEach(function(card){
    card.addEventListener("click", flipCard);
});


if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let overlays = Array.from(document.getElementsByClassName('overlay-text'));

    overlays.forEach(overlay => {
        overlay.addEventListener('click', () => {
            overlay.classList.remove('visible');
        });
    });
}

(function shuffle() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * 12);
      card.style.order = randomPos;
    });
  })();