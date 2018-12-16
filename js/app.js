let deck;
let openCards;
let moves;
let matches;
let minutes, seconds;
let timer;

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
      matches ++;
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
  updateStarScore();
  showMovesCount();
}

function showStars() {
  let maxStarScore = 5;

  for (let i = 0; i < maxStarScore; i++) {
    $('#main-score-stars').append("<li><i class='fas fa-star'></i></li>");
  }
}

function showMovesCount() {
  $('.moves').text(moves);
}

function increaseMovesCount(){
  moves ++;
}

function updateStarScore() {
  let starsArray = $('.stars').children().toArray();

  switch (moves) {
    case 21: starsArray[0].classList.add('disabled');
    case 17: starsArray[1].classList.add('disabled');
    case 13: starsArray[2].classList.add('disabled');
    case  9: starsArray[3].classList.add('disabled');
    case  5: starsArray[4].classList.add('disabled');
  }

  checkGameOver();
}

function checkGameOver() {
  if (moves >= 21) {
    gameOver(false);
  } else if (matches === (deck.length/2)) {
    gameOver(true);
  }
}

function gameOver(win){
  let score, starsList, star;

  $('.score-time').html($('.timer').html());

  score = $('#main-score-stars').children().not('.disabled').toArray();
  console.log(score.length);
  star = "<li><i class='fas fa-star'></i></li>";
  starsList = $('#modal-score').empty();
  score.forEach(function(){
    starsList.append(star);
  });

  if (win) {
    $('#score-title').html('Vitória!');
  } else {
    $('#score-title').html('Derrota!');
  }


  $('.score-moves').html(moves);

  $('score-modal').append(starsList);
  showModal();
}

function startTimer() {
  timer.start();
  timer.addEventListener('secondsUpdated', function (e) {
    $('.timer').html(timer.getTimeValues().toString(['minutes','seconds']));
  });
}

function showModal() {
  $('.modal').css('display', 'flex');
}

function hideModal() {
  $('.modal').css('display', 'none');
}

$(function startGame(){
  $('.restart').click(function (){
    hideModal();
    startGame(location.reload());
  });

  $('.deck').click('.card', function(event) {
    openCard(event.target, openCards);
  });

  deck = ["fa-cat","fa-horse-head", "fa-dog", "fa-dove", "fa-dragon", "fa-hippo", "fa-frog", "fa-spider"];
  deck = [...deck, ...deck];
  openCards = [];
  moves = 0;
  matches = 0;
  minutes = 0, seconds = 0;
  timer = new easytimer.Timer();

  showStars();
  displayCards();
  startTimer(Date.now());
});

