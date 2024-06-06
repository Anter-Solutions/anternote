import { ObjectId } from "mongodb";

export type User = {
    _id?: ObjectId,
    fullName?: string,
    email?: string,
    password?: string,
    registrationDate?: string,
    imageUrl?: string,
    connections?: ServiceConnection[]
};

export type ServiceConnection = {
    provider: string,
    credentials: object
};

export type RegistrationState = {
    errors?:{
        fullName?: string[];
        email?: string[];
        password?: string[];
        confirmPassword?: string[];
    };
    message?: string | null;
};