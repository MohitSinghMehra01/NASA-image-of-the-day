// Get your NASA API key from https://api.nasa.gov/
const apiKey = 'ybd3dllNdYKB4rixyBULrCkVwSw8L9tSfDLbwnlM';

// Function to fetch the image of the day for the current date
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${currentDate}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
        })
        .catch(error => {
            console.error("Error fetching current image:", error);
            // Handle error display here
        });
}

// Function to fetch and display the image of the day for a selected date
function getImageOfTheDay(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
            saveSearch(date);
        })
        .catch(error => {
            console.error("Error fetching image for date:", error);
            // Handle error display here
        });
}

// Function to display an image in the "current-image-container"
function displayImage(data) {
    const container = document.getElementById('current-image-container');
    container.innerHTML = `
    <img src="${data.url}" alt="${data.title}">
    <h2>${data.title}</h2>
        <p>${data.explanation}</p>
    `;
}

// Function to save the selected date to local storage
function saveSearch(date) {
    // Retrieve the existing search history array from local storage
    let searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Add the new date to the search history array
    searches.push(date);

    // Save the updated search history array back to local storage
    localStorage.setItem('searches', JSON.stringify(searches));

    // Update the search history list in the UI
    addSearchToHistory();
}

// Function to add search history to the UI
function addSearchToHistory() {
    const historyList = document.getElementById('search-history');
    historyList.innerHTML = '';

    // Retrieve the search history array from local storage
    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Display search history as list items
    searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;
        listItem.addEventListener('click', () => {
            getImageOfTheDay(date);
        });
        historyList.appendChild(listItem);
    });
}

// Event listener for the search form submission
const searchForm = document.getElementById('search-form');
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const dateInput = document.getElementById('search-input').value;
    getImageOfTheDay(dateInput);
});

// Initialize the page by fetching and displaying the current image of the day
getCurrentImageOfTheDay();

// Load and display the search history from local storage
addSearchToHistory();