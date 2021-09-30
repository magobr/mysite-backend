import { UserType, UserStatus } from "../enums/UserEnum";
export interface User {
    _id: string,
    frist_name: string,
    last_name: string,
    email: string,
    password: string,
    user_type: UserType,
    user_status: UserStatus
}