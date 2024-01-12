import { JwtPayload } from "jwt-decode";

export interface userStore extends JwtPayload{
    data:{
        userId: string,
        email: string,
        username: string
    } 
}

export interface userData{
    userId: string,
    email: string,
    username: string
} 