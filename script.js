// Grabbing the DOM items
const quote = document.querySelector('#quote');
const author = document.querySelector('#author');
const newQuote = document.querySelector('#new-quote');
const twitter = document.querySelector('#twitter');
const quoteText = document.querySelector('.quote-text');
const loader = document.querySelector('.loader');
const quoteContainer = document.querySelector('#quote-container');

// Get Quotes from API
const generateRandomQuote = async () => {
  try {
    quoteContainer.style.display = 'none';
    loader.style.display = 'block';
    // Getting quotes from API
    const result = await fetch('https://type.fit/api/quotes');
    const response = await result.json();
    // Generating a random number for quote
    const randomNumber = Math.floor(Math.random() * response.length);
    // Random Quote
    const randomQuote = response[randomNumber];
    // Attaching a class where string is 80 chars or more
    if (randomQuote.text.length > 80) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    // Setting text for DOM elements
    quote.textContent = randomQuote.text;
    if (randomQuote.author) {
      author.textContent = ` ${randomQuote.author}`;
    } else {
      author.textContent = 'unknown';
    }
    quoteContainer.style.display = 'block';
    loader.style.display = 'none';
  } catch (error) {
    alert(error);
    generateRandomQuote();
  }
};

// Showing quote on load
window.addEventListener('load', generateRandomQuote);

// Showing quote in button click
newQuote.addEventListener('click', generateRandomQuote);

// Tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${author.textContent}`;
  window.open(twitterUrl, '_blank');
};

twitter.addEventListener('click', tweetQuote);
