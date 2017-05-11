// HTML objects
let app = document.getElementById('app'),
    macca = document.getElementById('macca'),
    danteButton = document.getElementById('danteButton'),
    demonArea = document.getElementById('demonArea');

// The main clock of the game. We will set this later
let mainClock;

// Global variables and constants
let score = 0,
    clickVal = 1,
    unitGrowth = 1.2;

// Making our button give us Macca based on the mult
danteButton.addEventListener('click', function() {
  score += clickVal;
  updateMacca();
});

// This will be called every time our Macca changes
function updateMacca() {
  macca.innerText = score.toFixed(2);
}

// Demon class
let Demon = function(name, price, mps) {
  this.name = '<h4>';
  this.name += name;
  this.name += ' <input type="button" value="Buy" onclick="buy(pixie)">';
  this.name += '</h4>';
  this.price = price;
  this.mps = mps/60;
  this.owned = 0;
}

// making new Demons
let pixie = new Demon('Pixie', 15, 0.1);
let party = [pixie];

// Drawing the demons on screen
for(i=0; i!=party.length; i++) {
  demonArea.innerHTML += party[i].name;
}

// function for buying demons
function buy(demon) {
  if(demon == pixie && score >= pixie.price) {
    console.log('You bought a pixie');
  }
}
