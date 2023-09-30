// Constants
const apiKey = 'ybd3dllNdYKB4rixyBULrCkVwSw8L9tSfDLbwnlM';
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const currentImageContainer = document.getElementById('current-image');
const searchHistoryList = document.getElementById('search-history');

// Event listener for form submission
searchForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedDate = searchInput.value;

    // Call getImageOfTheDay with the selected date
    getImageOfTheDay(selectedDate);
});

// Function to get the image of the day for the current date
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
}

// Function to get the image of the day for a specific date
function getImageOfTheDay(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the image and title in the current-image container
            currentImageContainer.innerHTML = `
                <img src="${data.url}" alt="${data.title}">
                <h3>${data.title}</h3>
            `;

            // Save the selected date to local storage and add it to the search history
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            currentImageContainer.innerHTML = '<p>An error occurred while fetching the image.</p>';
        });
}

// Function to save the selected date to local storage
function saveSearch(date) {
    // Retrieve the existing searches from local storage or initialize an empty array
    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Add the selected date to the array
    searches.push(date);

    // Save the updated array back to local storage
    localStorage.setItem('searches', JSON.stringify(searches));
}

// Function to add the search history to the UI
function addSearchToHistory() {
    // Retrieve the saved searches from local storage
    const searches = JSON.parse(localStorage.getItem('searches')) || [];

    // Clear the existing search history list
    searchHistoryList.innerHTML = '';

    // Create list items for each saved search date
    searches.forEach(date => {
        const listItem = document.createElement('li');
        listItem.textContent = date;

        // Add a click event listener to fetch and display the image for the clicked date
        listItem.addEventListener('click', () => getImageOfTheDay(date));

        searchHistoryList.appendChild(listItem);
    });
}

// Display the current image of the day when the page loads
getCurrentImageOfTheDay();
addSearchToHistory();
