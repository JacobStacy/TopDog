import { Dog } from "@/model/dog-model";
import { Schema } from "mongoose";


export async function createDog(dog: { 
    name: string,
    age: number,
    breed: string,
    bio: string,
    rank: number,
    likes: number,
    imageUrls: string[],
    user: Schema.Types.ObjectId,
}){

    try{
        await Dog.create(dog);

    } catch(error) {
        if (error instanceof Error) {
            throw(error);
        }
    }
}