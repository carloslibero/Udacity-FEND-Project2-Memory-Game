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

// Array that will have document elements for all cards objects
const cards = document.querySelectorAll('.image');

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//Initialize game
gameInit()


// Game Initialization function to initialize game logic as needed
function gameInit() {
  // Shuffles cardsArray
  shuffle(cardsArray);

  // Calls update function to update images in proper card divs
  updateCards(cards);

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
