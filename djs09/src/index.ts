// Number Types mini-challenge 10 10.2
// Write a function that will only accept numbers and attend to 
// all TypeScript weakness flags.
// : number

import { showReviewTotal, populateUser, showDetails, getTopTwoReviews} from '../pages/utils'
import { Permissions , LoyaltyUser } from '../pages/enums'
import  Review, { Property } from '../pages/interfaces'
import MainProperty from '../pages/classes' 

const propertyContainer = document.querySelector('.properties') as HTMLDivElement | null;
const reviewContainer = document.querySelector('.reviews') as HTMLDivElement | null;
const mainImageContainer = document.querySelector('.main-image') as HTMLDivElement | null;
const button = document.querySelector('button') as HTMLButtonElement | null;
const footer = document.querySelector('.footer') as HTMLDivElement | null;

// Reviews data
const reviews: Review[] = [
    { name: 'Sheila', stars: 5, loyaltyUser: LoyaltyUser.GOLD_USER, date: '01-04-2021' },
    { name: 'Andrzej', stars: 3, loyaltyUser: LoyaltyUser.BRONZE_USER, date: '28-03-2021' },
    { name: 'Omar', stars: 4, loyaltyUser: LoyaltyUser.SILVER_USER, date: '27-03-2021' },
];

// User data
const you = {
    firstName: 'Bobby',
    lastName: 'Brown',
    permissions: Permissions.ADMIN,
    isReturning: true,
    age: 35,
    stayedAt: ['florida-home', 'oman-flat', 'tokyo-bungalow']
};

// Property data
const properties: Property[] = [
    { src: '../assets/images/colombia-property.jpg', title: 'Colombian Shack', price: 45, location: { firstLine: 'shack 37', city: 'Bogota', code: 45632, country: 'Colombia' }, contact: [112343823978921, 'marywinkle@gmail.com'], isAvailable: true },
    { src: '../assets/images/poland-property.jpg', title: 'Polish Cottage', price: 30, location: { firstLine: 'no 23', city: 'Gdansk', code: 343903, country: 'Poland' }, contact: [1298239028490830, 'garydavis@hotmail.com'], isAvailable: false },
    { src: '../assets/images/london-property.jpg', title: 'London Flat', price: 25, location: { firstLine: 'flat 15', city: 'London', code: 'SW4 5XW', country: 'United Kingdom' }, contact: [34829374892553, 'andyluger@aol.com'], isAvailable: true },
    { src: '../assets/images/malaysian-hotel.jpeg', title: 'Malia Hotel', price: 35, location: { firstLine: 'Room 4', city: 'Malia', code: 45334, country: 'Malaysia' }, contact: [60349822083, 'lee34@gmail.com'], isAvailable: false },
];

// Display reviews and user
showReviewTotal(reviews.length, reviews[0].name, reviews[0].loyaltyUser);
populateUser(you.isReturning, you.firstName);

// Display properties
if (propertyContainer) {
    properties.forEach(property => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = property.title;

        const image = document.createElement('img');
        image.setAttribute('src', property.src);
        card.appendChild(image);

        showDetails(you.permissions, card, property.price);
        propertyContainer.appendChild(card);
    });
}

// Add reviews logic
let count = 0;
if (button) {
    button.addEventListener('click', () => {
        if (!count) {
            count++;
            const topTwo = getTopTwoReviews(reviews);
            topTwo.forEach(review => {
                const card = document.createElement('div');
                card.classList.add('review-card');
                card.innerHTML = `${review.stars} stars from ${review.name}`;
                reviewContainer?.appendChild(card);
            });
            button.style.display = 'none';
        }
    });
}

// Footer information
const currentLocation: [string, string, number] = ['London', '11.03', 17];
if (footer) {
    footer.innerHTML = `${currentLocation[0]} ${currentLocation[1]} ${currentLocation[2]}°`;
}

// Display main property
const yourMainProperty = new MainProperty(
    '../assets/images/italian-property.jpg',
    'Italian House',
    [{ name: 'Olive', stars: 5, loyaltyUser: LoyaltyUser.GOLD_USER, date: '12-04-2021' }]
);

if (mainImageContainer) {
    const image = document.createElement('img');
    image.setAttribute('src', yourMainProperty.src);
    mainImageContainer.appendChild(image);
}