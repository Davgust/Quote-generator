const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

let apiQuotes = [];

//Show Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

//Hide Loading
const complete = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
const newQuote = () => {
  loading();
  // Pick a random quote
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check Author field
  if (!quote.author) {
     authorText.textContent = "Unknown"
  } else {
    authorText.textContent = quote.author;
  }
  // Check length of quote 
  if (quote.text.lenght > 120) {
    quoteText.classList.add('long-quote')
  } else {
    quoteText.classList.remove('long-quote')
  }
  // Set quote, hide loader
  quoteText.textContent = quote.text;
  complete();
}

// Get Quotes From API
 const getQuotes = async () => {
   loading();
  const apiUrl = 'https://type.fit/api/quotes';
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote()
  } catch (error) {
    console.log(error);
  }
}

// Tweet Quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();

