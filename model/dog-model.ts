import mongoose, {Schema} from "mongoose";

export type DogType = {
    name: string,
    age: number,
    breed: string,
    bio: string,
    rank: number,
    likes: number,
    imageUrls: string[],
    user: Schema.Types.ObjectId, // Foreign key reference to the User model
}

const dogSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    age: {
        required: true,
        type: Number,
    },
    breed: {
        required: true,
        type: String,
    },
    bio: {
        type: String,
    },
    rank: {
        type: Number,
    },
    likes: {
        type: Number,
        default: 0,
    },
    imageUrls: {
        type: [String],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
});

export const Dog = mongoose.models.Dog ?? mongoose.model("Dog", dogSchema);