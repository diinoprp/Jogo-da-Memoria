let deck = ["fa-cat","fa-horse-head", "fa-dog", "fa-dove", "fa-dragon", "fa-hippo", "fa-frog", "fa-spider",
            "fa-cat","fa-horse-head", "fa-dog", "fa-dove", "fa-dragon", "fa-hippo", "fa-frog", "fa-spider"];

let openCards = [];
let moves = 0, starScore = 5;

function displayCards() {
  shuffle(deck).forEach(function(card) {
    $('.deck').append(`<li class="card"><i class="fas ${card}"></i></li>`);
  });
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function openCard(card) {

  card.classList.add('open');
  card.classList.add('show');
  openCards.push(card);

  checkOpenCards(openCards);

}

function checkOpenCards(){
  if (openCards.length === 2){
    if (openCards[0].firstChild.className === openCards[1].firstChild.className) {

      openCards.forEach(function(openCard){
        openCard.classList.add("match");
      });

      openCards = [];

    } else {
      $('.card').addClass('disableClick');

      setTimeout(function() {
        $('.card').removeClass('disableClick');

        openCards.forEach(function(openCard) {
          openCard.classList.remove("open");
          openCard.classList.remove("show");
        });

        openCards = [];

      }, 700);
      increaseMovesCount();
    }
  }
  showMovesCount();
}

function showStars() {
  let maxStarScore = 5;

  for (let i = 0; i < maxStarScore; i++) {
    $('.stars').append("<li><i class='fas fa-star'></i></li>");
  }
}

function showMovesCount() {
  $('.moves').text(moves);
}

function increaseMovesCount(){
  moves ++;
  updateStarScore();
}

function updateStarScore() {
  let starsArray = $('.stars').children().toArray();
  
  if (moves > 10) {
    starsArray[0].classList.add('disabled');
    starScore --;
  } else if (moves > 9) {
    starsArray[1].classList.add('disabled');
    starScore --;
  } else if (moves > 7) {
    starsArray[2].classList.add('disabled');
    starScore --;
  } else if (moves > 5) {
    starsArray[3].classList.add('disabled');
    starScore --;
  } else if (moves > 3) {
    starsArray[4].classList.add('disabled');
    starScore --;
  }

  checkGameOver();
}

function checkGameOver() {
  if (starScore <= 0) {
    console.log("Game Over!");
  }
}

$(function start(){
  showStars();
  displayCards();

  $('.deck').click('.card', function(event) {
    openCard(event.target, openCards);
  });

});

