import { LoyaltyUser } from './enums';

export default interface Review {
    name: string;
    stars: number;
    loyaltyUser: LoyaltyUser;
    date: string;
}

export interface Property {
    src: string; // Changed from 'image' to 'src'
    title: string;
    price: number;
    location: {
        firstLine: string;
        city: string;
        code: number | string;
        country: string;
    };
    contact: [number, string];
    isAvailable: boolean;
}
