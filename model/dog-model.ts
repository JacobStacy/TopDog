import mongoose, {Schema} from "mongoose";

export type DogType = {
    name: string,
    age: number,
    breed: string,
    bio: string,
    rank: number,
    likes: number,
    imageUrls: string[],
    hasJudged: Schema.Types.ObjectId[],
    completed: boolean,
    user: Schema.Types.ObjectId,
    _id: Schema.Types.ObjectId,
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
    completed: {
        required: true,
        type: Boolean,
    },
    haveJudged:{
        type: [String],
        default: [],
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