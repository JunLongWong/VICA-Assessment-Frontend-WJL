import { UserRoleEnum } from "../../models/UserRoleEnum";
import { UserStatus } from "../../models/userStatusEnum";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    role: UserRoleEnum;
    status: UserStatus;
    date_joined: string;
}
export interface IBook {
    _id: string;
    title: string;
    description: string;
    genre: string;
    author: string;
    published_year: number;
    quantity: number
}
