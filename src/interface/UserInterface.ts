import { UserType } from "../enums/UserEnum";
export interface User {
    frist_name: String,
    last_name: String,
    email: String,
    password: String,
    user_type: UserType
}