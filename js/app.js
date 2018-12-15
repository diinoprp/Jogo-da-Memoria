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

function displayCard(card) {
  card.classList.toggle('show');
}

$(function(){
  let deck = [];
  deck.push($("<li class='card'></li>").append("<i class='fas fa-cat'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-horse-head'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-dog'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-dove'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-dragon'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-hippo'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-frog'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-spider'></i>"));

  deck.push($("<li class='card'></li>").append("<i class='fas fa-dog'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-cat'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-horse-head'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-dove'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-dragon'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-hippo'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-frog'></i>"));
  deck.push($("<li class='card'></li>").append("<i class='fas fa-spider'></i>"));

  $('.board').click('li', function(e) {
    displayCard(e.target);
  });

  $('.board').append(shuffle(deck));

});

