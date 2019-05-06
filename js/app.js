// Adding event listerner to all objects inside container
const objectContainer = document.querySelector(".container");
objectContainer.addEventListener('click', function () { eventListener(event) });

/*
 * Create a list that holds all of your cards
* Will use list from https://www.ranker.com/crowdranked-list/the-best-rock-bands-of-all-time
* As it is a 16 memory game, the best 8 rock bands will be used
*/

// All 16 cards will be stored in cardsArray for usage in other parts of game
let cardsArray = ['Led Zeppelin', 'Led Zeppelin', 'The Beatles', 'The Beatles',
                  'Pink Floyd', 'Pink Floyd', 'The Rolling Stones', 'The Rolling Stones',
                  'Queen', 'Queen', 'The Who', 'The Who',
                  'ACDC', 'ACDC', 'Jimi Hendrix', 'Jimi Hendrix'];

// Array that will handle cards that got clicked
let cardsClickedArray = [];

// Array that will hold move counter value objects
const moveValue = document.querySelector('.moves');

// Variable that will hold number of movements
let numberOfMoves = 0;

// Array that will have document elements for all cards objects
const cards = document.querySelectorAll('.image');

// Array that will hold clock value elements
const clockValue = document.querySelector('.clock-value');

// Initialize clock Variable as game is open
let clockVar;
let timeInSeconds = 0;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Initialize game
gameInit();

// Game Initialization function to initialize game logic as needed
function gameInit() {
  // Shuffles cardsArray
  shuffle(cardsArray);

  // Calls update function to update images in proper card divs
  updateCards(cards);

  // Initialize clock timer and run it every second
  timeInSeconds = 0;
  clockValue.textContent = "00:00";
  clockVar = setInterval(clock, 1000);

  // Initialize number of movements
  numberOfMoves = 0;
  updateMoveCounter();

  // Restart card classes
  reloadCardsClasses();
}

// Return image name according to value informed
function imageToUse (imageText) {
  // Based on array text returns the image name and path to be used.
  switch (imageText) {
    case 'Led Zeppelin':
      return('img/led-zeppelin-photo-u16.webp');
      break;
    case 'The Beatles':
      return('img/the-beatles-writers-photo-1.webp');
      break;
    case 'Pink Floyd':
      return('img/pink-floyd-recording-artists-and-groups-photo-2.webp');
      break;
    case 'The Rolling Stones':
      return('img/the-rolling-stones-recording-artists-and-groups-photo-u6.webp');
      break;
    case 'Queen':
      return('img/queen-photo-u13.webp');
      break;
    case 'The Who':
      return('img/the-high-numbers-writers-photo-2.webp');
      break;
    case 'ACDC':
      return('img/ac-and-dc-recording-artists-and-groups-photo-u6.webp');
      break;
    case 'Jimi Hendrix':
      return('img/jimi-hendrix-recording-artists-and-groups-photo-u36.webp');
      break;
    default:
  }
}

// Update cards based on provided Array
function updateCards(arrayCardElement) {
  // loop through card divs
  for (let i=0; i < arrayCardElement.length; i++) {
    updateCardImageSrc(arrayCardElement[i], i);
  }
}

// Update card image src attribute and alt attribute
function updateCardImageSrc (cardElement, cardItemNumber) {
  cardElement.src = imageToUse(cardsArray[cardItemNumber]);
  cardElement.alt = cardsArray[cardItemNumber];
}

// Shuffle function from http://stackoverflow.com/a/2450976
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

// Reload function to be used in case user clicked on reload/restart icon
function reload() {
  // Stop clock
  stopClock();
  // run gameInit
  gameInit();
}

// Runs clock and updates clock text with minuntes:seconds (mm:ss)
function clock() {
  // Adds one second to time clock
  timeInSeconds++;
  // Format output to be displayed in time clock element
  let totalMinutes = parseInt(timeInSeconds / 60);
  let totalSeconds = parseInt(timeInSeconds % 60);

  // Text formating to be outputted
  let textMinutes = "00";
  let textSeconds = "00";

  // Handles single digit formatting for Minutes
  if (totalMinutes <= 9) {
    textMinutes = "0" + totalMinutes;
  }
  else {
    textMinutes = totalMinutes;
  }

  // Handles single digit formatting for Seconds
  if (totalSeconds <= 9) {
    textSeconds = "0" + totalSeconds;
  }
  else {
    textSeconds = totalSeconds;
  }

  clockValue.textContent = textMinutes + ":" + textSeconds;

}

// Stop clock function to stop clock in case of reloading or winning
function stopClock() {
  // Stops clock execution
  window.clearInterval(clockVar);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Function that will listen to all events in container
function eventListener(evt) {
  // Check the class for the clicked element
  switch (evt.target.className) {
    // If element is from restart class, run reload function
    case 'fa fa-repeat':
      reload();
      break;
    case 'restart-text':
      reload();
      break;
    // If element is from card, handle the card click event.
    case 'card':
      numberOfMoves++;
      updateMoveCounter();
      cardClicked(evt);
      break;
  }
}

// Function that handles card clicked
function cardClicked(eventCard) {
  // First validates the size of the array. If equal to 2, no more clicks
  switch (cardsClickedArray.length) {
    case 0:
      // Array is empty add card to it and add open class to card
      clearUnMatched();
      cardsClickedArray.push(eventCard.target.firstElementChild.alt);
      eventCard.target.classList.add("open");
      break;
    case 1:
      // Add second card to array, add open class to card and check match
      cardsClickedArray.push(eventCard.target.firstElementChild.alt);
      eventCard.target.classList.add("open");
      checkUnmatch = true;
      cardMatched();
      break;
    case 2:
      // Do nothing as there are two cards opened
      break;
  }
}

// Function to clear unmatched class from cards
function clearUnMatched() {
  // retrieve unmatched cards and remove its class
  let cardsUnMatched = document.getElementsByClassName("unmatch");
  for (let i = (cardsUnMatched.length - 1); i >= 0; i--) {
    cardsUnMatched[i].classList.remove("unmatch");
  }
}

// Function to clear matched class from cards
function clearMatched() {
  // retrieve matched cards and remove its class
  let cardsMatched = document.getElementsByClassName("match");
  for (let i = (cardsMatched.length - 1); i >= 0; i--) {
    cardsMatched[i].classList.remove("match");
  }
}

// Function to check if cards matched
function cardMatched() {
  // Check if values are the same and handle them properly
  if (cardsClickedArray[0] === cardsClickedArray[1]) {
    // They match, clear array and update from open to matched
    cardsClickedArray = [];
    let cardsOpened = document.getElementsByClassName("open");
    cardsOpened[1].classList.add("match");
    cardsOpened[1].classList.remove("open");
    cardsOpened[0].classList.add("match");
    cardsOpened[0].classList.remove("open");
    if (checkWin()) {
      //display modal window
    }
  }
  else {
    // No match, return them to original started
    cardsClickedArray = [];
    let cardsOpened = document.getElementsByClassName("open");
    cardsOpened[1].classList.add("unmatch");
    cardsOpened[1].classList.remove("open");
    cardsOpened[0].classList.add("unmatch");
    cardsOpened[0].classList.remove("open");
  }
}

// Function to update move counter
function updateMoveCounter() {
  moveValue.textContent = numberOfMoves;
}

// Function to reload card classes during game Initialization or reload
function reloadCardsClasses() {
  // Remove unmatched
  clearUnMatched();

  // Remove opened
  let cardsOpened = document.getElementsByClassName("open");
  for (let j = (cardsOpened.length - 1); j >= 0; j--) {
    cardsOpened[j].classList.remove("open");
  }

  // Remove matched
  clearMatched();
}

// Function to check for win condition
function checkWin() {
  // Get all cards with match class if equals 16, it is a win condition
  let cardsMatched = document.getElementsByClassName("match");
  if (cardsMatched.length == 16) {
    // Won the game
    console.log("You Won");
    return true;
  }
  else {
    console.log("Keep playing");
    return false;
  }
}
