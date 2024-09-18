import mongoose, {Schema} from "mongoose";

export type UserType = {
    name: string,
    password: string,
    email: string,
}

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    password: {
        required: true,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
});


export const User = mongoose.models.User ?? mongoose.model("User", userSchema);