
import { LoyaltyUser, Permissions } from './enums.ts'
import  Review  from './interfaces.ts'

const reviewTotalDisplay = document.querySelector('#reviews') as HTMLElement | null;
const returningUserDisplay = document.querySelector('#returning-user') as HTMLElement | null;
const userNameDisplay = document.querySelector('#user') as HTMLElement | null;

// Displays total reviews
export function showReviewTotal(value: number, reviewer: string, isLoyalty: LoyaltyUser) {
    const iconDisplay = isLoyalty === LoyaltyUser.GOLD_USER ? '⭐' : '';
    if (reviewTotalDisplay) {
        reviewTotalDisplay.innerHTML = `${value} review${makeMultiple(value)} | last reviewed by ${reviewer} ${iconDisplay}`;
    }
}

// Populates user details
export function populateUser(isReturning: boolean, userName: string) {
    if (returningUserDisplay && isReturning) {
        returningUserDisplay.innerHTML = 'back';
    }
    if (userNameDisplay) {
        userNameDisplay.innerHTML = userName;
    }
}

// Shows additional property details
export function showDetails(value: boolean | Permissions, element: HTMLDivElement, price: number) {
    if (value) {
        const priceDisplay = document.createElement('div');
        priceDisplay.innerHTML = `${price}/night`;
        element.appendChild(priceDisplay);
    }
}

// Handles pluralization
export function makeMultiple(value: number): string {
    return value > 1 || value === 0 ? 's' : '';
}

// Returns the top two reviews
export function getTopTwoReviews(reviews: Review[]): Review[] {
    return reviews.sort((a, b) => b.stars - a.stars).slice(0, 2);
}