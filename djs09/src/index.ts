// Number Types mini-challenge 10 10.2
// Write a function that will only accept numbers and attend to 
// all TypeScript weakness flags.
// : number

// Importing functions and modules from other files for functionality and organization
import { showReviewTotal, populateUser, showDetails, getTopTwoReviews } from './utils'; // Utility functions for displaying reviews, user data, and details
import { Permissions, LoyaltyUser } from './enums'; // Enumerations for user permissions and loyalty levels
import Review, { Property } from './interfaces'; // TypeScript interfaces for reviews and properties
import MainProperty from './classes'; // A class for managing main property information
import './index.css'; // CSS styles for the application

// Selecting HTML elements and casting them to specific types for strict TypeScript type checking
const propertyContainer = document.querySelector('.properties') as HTMLDivElement | null; // Container for property cards
const reviewContainer = document.querySelector('.reviews') as HTMLDivElement | null; // Container for reviews
const mainImageContainer = document.querySelector('.main-image') as HTMLDivElement | null; // Container for the main image
const button = document.querySelector('button') as HTMLButtonElement | null; // Button to load reviews
const footer = document.querySelector('.footer') as HTMLDivElement | null; // Footer for displaying location information

// Defining reviews data as an array of Review objects
const reviews: Review[] = [
    { name: 'Sheila', stars: 5, loyaltyUser: LoyaltyUser.GOLD_USER, date: '01-04-2021' },
    { name: 'Andrzej', stars: 3, loyaltyUser: LoyaltyUser.BRONZE_USER, date: '28-03-2021' },
    { name: 'Omar', stars: 4, loyaltyUser: LoyaltyUser.SILVER_USER, date: '27-03-2021' },
];

// User data object with user details and permissions
const you = {
    firstName: 'Bobby',
    lastName: 'Brown',
    permissions: Permissions.ADMIN, // User has admin permissions
    isReturning: true, // Indicates if the user is a returning customer
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow'], // List of previously visited properties
};

// Array of property objects with details about available properties
const properties: Property[] = [
    { src: '/images/colombia-property.jpg', title: 'Colombian Shack', price: 45, location: { firstLine: 'shack 37', city: 'Bogota', code: 45632, country: 'Colombia' }, contact: [112343823978921, 'marywinkle@gmail.com'], isAvailable: true },
    { src: '/images/poland-property.jpg', title: 'Polish Cottage', price: 30, location: { firstLine: 'no 23', city: 'Gdansk', code: 343903, country: 'Poland' }, contact: [1298239028490830, 'garydavis@hotmail.com'], isAvailable: false },
    { src: '/images/london-property.jpg', title: 'London Flat', price: 25, location: { firstLine: 'flat 15', city: 'London', code: 'SW4 5XW', country: 'United Kingdom' }, contact: [34829374892553, 'andyluger@aol.com'], isAvailable: true },
    { src: '/images/malaysian-hotel.jpeg', title: 'Malia Hotel', price: 35, location: { firstLine: 'Room 4', city: 'Malia', code: 45334, country: 'Malaysia' }, contact: [60349822083, 'lee34@gmail.com'], isAvailable: false },
];

// Displaying the total number of reviews and the first reviewer’s details
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);

// Populating user information in the UI
populateUser(you.isReturning, you.firstName);

// Displaying property cards in the properties container
if (propertyContainer) {
    properties.forEach(property => {
        const card = document.createElement('div'); // Create a card element for each property
        card.classList.add('card'); // Add a CSS class for styling
        card.innerHTML = property.title; // Set the property title

        const image = document.createElement('img'); // Create an image element
        image.setAttribute('src', property.src); // Set the property image source
        card.appendChild(image); // Append the image to the card

        showDetails(you.permissions, card, property.price); // Display additional details based on user permissions
        propertyContainer.appendChild(card); // Add the card to the container
    });
}

// Adding click event listener to load top two reviews when the button is clicked
let count = 0; // Counter to ensure the button is clicked only once
if (button) {
    button.addEventListener('click', () => {
        if (!count) {
            count++; // Increment the count to disable subsequent clicks
            const topTwo = getTopTwoReviews(reviews); // Get the top two reviews
            topTwo.forEach(review => {
                const card = document.createElement('div'); // Create a card for each review
                card.classList.add('review-card'); // Add a CSS class for styling
                card.innerHTML = `${review.stars} stars from ${review.name}`; // Display review details
                reviewContainer?.appendChild(card); // Append the review card to the reviews container
            });
            button.style.display = 'none'; // Hide the button after reviews are loaded
        }
    });
}

// Displaying footer information with the current location
const currentLocation: [string, string, number] = ['London', '11.03', 17]; // Tuple with city, date, and temperature
if (footer) {
    footer.innerHTML = `${currentLocation[0]} ${currentLocation[1]} ${currentLocation[2]}°`; // Format and display footer content
}

// Displaying the main property image in the main image container
const yourMainProperty = new MainProperty(
    '/images/italian-property.jpg', // Property image source
    'Italian House', // Property title
    [{ name: 'Olive', stars: 5, loyaltyUser: LoyaltyUser.GOLD_USER, date: '12-04-2021' }] // Associated reviews
);

if (mainImageContainer) {
    const image = document.createElement('img'); // Create an image element
    image.setAttribute('src', yourMainProperty.src); // Set the source to the main property image
    mainImageContainer.appendChild(image); // Append the image to the container
}
