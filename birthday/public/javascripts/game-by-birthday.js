// game.js
$(document).ready(function(){
  $("#gameContainer1").hide().fadeIn(1000);
});

// generate all the cards and add them to the gameContainer
startGame();
function startGame() {
  // request(url, function (error, response, body) {
    // var list = JSON.parse(body.slice(0, body.length));
  var list = $.getJSON('/JSONForGame', {}, function(list) {
    console.log(list);
    // var list = [{"title":"Jenn Rodriguez","start":"2015-08-05"},{"title":"Sharon Choi","start":"2015-11-03"},{"title":"Sei Kim","start":"2015-08-13"},{"title":"Jessica Wang","start":"2015-09-19"}];
    for (i = 0; i < list.length; i++) {
      var name = (list[i].title);
      var birthday = (list[i].start.slice(5,10));
      addCard(name,birthday);
    }
  });

  // });
  // add event listener to button
  var button = document.getElementById('give-up-button');
  button.addEventListener('click', giveUp);
}

// get the game container
function addCard(name, birthday) {
  var gameContainer = document.getElementById('gameContainer1');
  var item = document.createElement('div');
  item.setAttribute('class', 'item stylish c');
  item.innerHTML = birthday;

  var p = document.createElement('p');
  p.setAttribute('class', 'item-space');
  item.appendChild(p);

  var input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', name);
  input.setAttribute('style', 'width: 175px');
  input.setAttribute('class', 'name-inputs');
  item.appendChild(input);

  var button = document.createElement('button');
  button.setAttribute('class', 'button');
  button.innerHTML = 'Check';
  button.addEventListener('click', check);
  item.appendChild(button);

  gameContainer.appendChild(item);

  function check(event) {
    var nameTest = toTitleCase(this.previousSibling.value);
    if (this.previousSibling.id === nameTest) {
      this.parentNode.style.backgroundColor = '#49E20E';
    }
    else {
      this.parentNode.style.backgroundColor = 'red';
    }
  }

}

function giveUp(event) {
  // get all cards
  var cards = document.getElementsByClassName('item');

  for (i = 0; i < cards.length; i++) {
    cards[i].style.backgroundColor = '#49E20E';
    var childNodes = cards[i].childNodes;
    childNodes[2].value = childNodes[2].id;
  }
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}
