"use server";

import { unstable_noStore as noStore, unstable_cache as cache, unstable_cache, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { RegistrationState, ServiceConnection, User } from './definitions';
import clientPromise from '@/mongodb';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs'
import { signOut, auth, signIn } from '@/auth';
import { Account, AuthError, Profile } from 'next-auth';
import { MouseEventHandler } from 'react';
import { useSession } from 'next-auth/react';
import { ObjectId } from 'mongodb';

// Shared stuff

const FormSchema = z.object({
    _id: z.any(),
    fullName: z.string(),
    email: z.string(),
    password: z.string().min(6, 'Password must contain at least 6 characters.'),  
    registrationDate: z.string() 
});

const SearchUser = FormSchema.pick({email: true});

const CreateUser = FormSchema.omit({_id: true});

async function getCollection(){
    return (await clientPromise).db().collection('users');
}       

export async function getUser(email: string | undefined | null){
    if(!email){
        return null;
    }
    const col = await getCollection();
    const res = await col.findOne<User>({email});
    return res;
}

export async function getUserById(id: ObjectId | undefined | null){
    if(!id){
        return null;
    }
    noStore();
    const col = await getCollection();
    const res = await col.findOne<User>({_id: ObjectId.createFromHexString(id.toString())});
    return res;
}

// Functions used mostly on client

export async function signInUser(prevState: string | undefined, formData: FormData){
    try{
        await signIn('credentials', formData);
    }
    catch(error){
        if(error instanceof AuthError){
            switch(error.type){
                case 'CredentialsSignin':
                return 'Invalid credentials.';
                default: 
                return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function signUpUser(prevState: RegistrationState, formData: FormData){
    const user = await CreateUser.safeParseAsync({
        fullName: formData.get('full-name'),
        email: formData.get('email'),
        password: formData.get('password'),
        registrationDate: new Date().toISOString(),
    });
    if(!user.success){
        return{
            errors: user.error.flatten().fieldErrors,
            message: 'Invalid data.'
        };
    }
    const confirmPassword = formData.get('confirm-password');
    if(user.data.password !== confirmPassword){
        return{message: 'Passwords do not match.'};
    }
    if(await getUser(user.data.email)){
        return{
            message: 'User with that email already exists.'
        }
    }
    let genSalt = await bcrypt.genSalt(10);
    let passwordHash = await bcrypt.hash(user.data.password, genSalt);
    let newUser: User = {
        fullName: user.data.fullName,
        email: user.data.email,
        password: passwordHash,
        registrationDate: user.data.registrationDate
    }
    const col = await getCollection();
    const result = await col.insertOne(newUser);
    if(!result.acknowledged){
        return {
            message: 'There was an error signing you up, try again later.'
        };
    }
    redirect('/auth/login');
}

export async function signOutUser(){
    await signOut();
    redirect('/auth/login');
}  

export async function signInWithGoogle(){
    await signIn('google');
}

// Functions used mostly on servers

export async function getOAuthUser(account: Account, profile: Profile){
    const col = await getCollection();
    let credentials = {
        email: profile?.email
    };
    let sCon: ServiceConnection = {
        provider: account.provider,
        credentials: {
            credentials
        }
    };
    let user = {
        connections: [sCon]
    };
    let foundUser = await col.findOne<User>(user);
    return foundUser;
}

export async function signInWithOAuthCallback(account: Account, profile: Profile | undefined){
    const col = await getCollection();
    let credentials = {
        email: profile?.email
    };
    let sCon: ServiceConnection = {
        provider: account.provider,
        credentials: {
            credentials
        }
    };
    let user = {
        connections: [sCon]
    };
    let foundUser = await col.findOne<User>(user);
    if(foundUser && foundUser._id){
        return foundUser;
    }else{
        let newUser: User = {
            fullName: profile?.name?.toString(),
            imageUrl: profile?.picture.toString(),
            registrationDate: new Date().toISOString(),
            connections: user.connections
        }
        let insertResult = await col.insertOne(newUser);
        if(insertResult.acknowledged){
            newUser._id = insertResult.insertedId;
            return newUser;
        }
    }
}