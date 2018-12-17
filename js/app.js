"use strict";

let deck;
let openCards;
let moves;
let matches;
let minutes, seconds;
let timer;

// Exibe todas as cartas na tela
function displayCards() {
  shuffle(deck).forEach(function(card) {
    $('.deck').append(`<li class="card"><i class="fas ${card}"></i></li>`);
  });
}


// Embaralha um array de Cartas
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

// Vira uma Carta quando clicada
function openCard(card) {

  card.classList.add('open');
  card.classList.add('show');
  openCards.push(card);

  checkOpenCards(openCards);

}

// Responsável pela parte de Match das cartas e controle de alguns Scores
function checkOpenCards(){
  if (openCards.length === 2) {
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

// Exibe o contador de Estrelas no Score Principal
function showStars() {
  let maxStarScore = 5;

  for (let i = 0; i < maxStarScore; i++) {
    $('#main-score-stars').append("<li><i class='fas fa-star'></i></li>");
  }
}

// Exibe o contador de Movimentos no Score Principal
function showMovesCount() {
  $('.moves').text(moves);
}

// Incrementa o contador de movimentos
function increaseMovesCount(){
  moves ++;
}

// Responsável por atualizar visualmente o Score e chamar função que verifica o fim do jogo
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

// Verifica o fim do jogo

function checkGameOver() {
  if (moves >= 21) {
    gameOver(false);
  } else if (matches === (deck.length/2)) {
    gameOver(true);
  }
}

// Exibe modal de Vitória/Derrota com as informações da pontuação do jogador
function gameOver(win){
  let score, starsList, star;

  $('.score-time').html($('.timer').html());

  score = $('#main-score-stars').children().not('.disabled').toArray();
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

// Inicia o Timer
function startTimer() {
  timer.start();
  timer.addEventListener('secondsUpdated', function (e) {
    $('.timer').html(timer.getTimeValues().toString(['minutes','seconds']));
  });
}

// Exibe Modal
function showModal() {
  $('.modal').css('display', 'flex');
}

// Esconde Modal
function hideModal() {
  $('.modal').css('display', 'none');
}

// Inicia o Jogo
$(function startGame(){
  $('.restart').click(function (){
    hideModal();
    startGame(location.reload());
  });

  $('.deck').on('click', 'li' , function(event) {
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

