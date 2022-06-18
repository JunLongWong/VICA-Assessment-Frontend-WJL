import { UserRoleEnum } from "./UserRoleEnum";
import { UserStatusEnum } from "./userStatusEnum";

export type User = {
    id: string
    email: string
    name: string
    role: UserRoleEnum
    status: UserStatusEnum
    date_joined: string
}
