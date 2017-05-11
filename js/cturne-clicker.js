// HTML objects
let app = document.getElementById('app'),
    macca = document.getElementById('macca'),
    danteButton = document.getElementById('danteButton'),
    demonArea = document.getElementById('demonArea'),
    upgradeArea = document.getElementById('upgradeArea');

// The main clock of the game. We will set this later
let mainClock;

// Global variables and constants
let score = 0,
    clickVal = 1,
    unitGrowth = 1.2,
    lifetime = 0;

// Master Switch Board
let learnedDia = false,
    learnedRedCapot = false,
    learnedMaziodyne = false,
    learnedEandI = false;

// Making our button give us Macca based on the mult
danteButton.addEventListener('click', function() {
  score += clickVal;
  lifetime += clickVal;
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
  this.name += ' <input type="button" value="Buy" onclick="buy(';
  this.name += name.toLowerCase();
  this.name += ')">';
  this.name += '</h4>';
  this.price = price;
  this.mps = mps/60;
  this.owned = 0;
  this.stats = 'Price: ' + this.price.toFixed(2) + ' Macca // Owned: ' + this.owned + ' // MpS: ' + (this.mps * 60 * this.owned).toFixed(2);
}

function getDemonStats(demon) {
  return 'Price: ' + demon.price.toFixed(2) + ' Macca // Owned: ' + demon.owned + ' // MpS: ' + (demon.mps * 60 * demon.owned).toFixed(2);
}

// making new Demons
let pixie = new Demon('Pixie', 15, 0.1);
let jackfrost = new Demon('JackFrost', 100, 1);
let matador = new Demon('Matador', 1100, 8);
let thor = new Demon('Thor', 12000, 47);
let dante = new Demon('Dante', 130000, 260);
let party = [pixie, jackfrost, matador, thor, dante];

// Drawing the demons on screen
for(i=0; i!=party.length; i++) {
  demonArea.innerHTML += party[i].name;
  demonArea.innerHTML += party[i].stats;
}

// function for buying demons
function buy(demon) {
  if(score >= demon.price) {
    demon.owned++;
    score -= demon.price;
    demon.price = demon.price * unitGrowth;
  }

  updateDemonStats();
}

// Skill class
let Skill = function(name, price, mult, partyMem, improveClick, desc) {
  this.name = '<h4>';
  this.name += name;
  this.name += ' <input type="button" value="Learn" onclick="learn(';
  this.name += name.toLowerCase();
  this.name += ')"></h4>';
  this.price = price;
  this.mult = mult;
  this.learned = false;
  this.partyMem = partyMem;
  this.improveClick = improveClick;
  this.desc = '<p> Cost: ';
  this.desc += this.price;
  this.desc += ' Macca // Effect: ';
  this.desc += desc;
  this.desc += '</p>';

}

// Making new skills
let dia = new Skill('Dia', 100, 2, 0, true, 'Doubles MpS for Pixie(s) and clicking');
let skillCards = [dia];

// Learning skills function
function learn(skill) {
  if(skill.learned == false && score >= skill.price) {
    party[skill.partyMem].mps = party[skill.partyMem].mps * skill.mult;
    skill.learned = true;
    score -= skill.price;
    if(skill.improveClick) { clickVal = clickVal * skill.mult }
    updateDemonStats();
  }
}

// drawing the skills on screen
for(i=0; i!=skillCards.length; i++) {
  upgradeArea.innerHTML += skillCards[i].name;
  upgradeArea.innerHTML += skillCards[i].desc;
}

// Function that returns proper FPS value
function fps(n) { return 1000/n; }

// This will be called every time our demons' stats update:
function updateDemonStats() {
  demonArea.innerHTML = '<h3>Demons</h3>';
  for(i=0; i!=party.length; i++) {
    demonArea.innerHTML += party[i].name;
    party[i].stats = getDemonStats(party[i]);
    demonArea.innerHTML += party[i].stats;
  }
}

// Setting the main clock of the game
mainClock = setInterval(function() {
  for(i=0; i!=party.length; i++) {
    score += party[i].mps * party[i].owned;
    lifetime += party[i].mps * party[i].owned;
  }

  updateMacca();
},fps(60));
