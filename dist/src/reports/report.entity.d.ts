import { User } from '../users/user.entity';
export declare class Report {
    id: number;
    price: number;
    approved: boolean;
    make: string;
    model: string;
    year: number;
    lng: number;
    lat: number;
    mileage: number;
    user: User;
}
