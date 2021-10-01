import { Document } from "mongoose";
import { UserType, UserStatus } from "../enums/UserEnum";
export interface User extends Document {
    _id: string,
    frist_name: string,
    last_name: string,
    email: string,
    password: string,
    user_type: UserType,
    user_status: UserStatus
}