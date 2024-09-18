import { User } from "@/model/user-model";


export async function createUser(user: { 
    name: string; 
    password: string; 
    email: string }){

    try{
        await User.create(user);

    } catch(error) {
        if (error instanceof Error) {
            throw(error);
        }
    }
}