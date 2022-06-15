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