import { UserProps } from "../types/Authentication.ts"; 

export const isFollowingUserPropsSchema = (obj: any): obj is UserProps => {
    return (
        typeof obj.firstName === "string" &&
        typeof obj.lastName === "string" &&
        typeof obj.email === "string" &&
        typeof obj.role === "string" &&
        typeof obj.picture === "string"
    );
};