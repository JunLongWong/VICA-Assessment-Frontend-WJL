import { UserRoleEnum } from "./UserRoleEnum";
import { UserStatus } from "./userStatusEnum";

export type User = {
    id: string
    email: string
    name: string
    role: UserRoleEnum
    status: UserStatus
    date_joined: string
}
