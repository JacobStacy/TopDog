import mongoose, {Schema} from "mongoose";

export type UserType = {
    name: string,
    password: string,
    email: string,
    doneTut: string,
}

const userSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    password: {
        required: false,
        type: String,
    },
    email: {
        required: true,
        type: String,
    },
    doneTut: {
        type: Boolean,
        default: false,
    },
});


export const User = mongoose.models.User ?? mongoose.model("User", userSchema);