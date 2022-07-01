import { UserRoleEnum } from "../../../models/UserRoleEnum";
import { UserStatusEnum } from "../../../models/userStatusEnum";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    role: UserRoleEnum;
    status: UserStatusEnum;
    date_joined: string;
}
export interface IBook {
    _id: string;
    title: string;
    description: string;
    genre: string;
    author: string;
    published_year: number;
    quantity: number;
    availability?: BookAvailability;
}
export enum BookAvailability {
    AVAILABLE="AVAILABLE",
    UNAVAILABLE="UNAVAILABLE",
}
export interface BorrowingStatus {
    BORROWED: "BORROWED",
    RETURNED: "RETURNED",
}

export interface IBorrowHistory {
    _id: string;
    user: string;
    book: string;
    date_borrowed: Date;
    date_returned?: Date;
    status: BorrowingStatus
}