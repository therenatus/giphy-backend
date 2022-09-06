import mongoose from "mongoose";

const UserShema = new mongoose.Schema(
    {
        name: { type: String, require: true},
        email: { type: String, require: true, unique: true},
        password: { type: String, require: true, select: false}
    },
    {
        timestamps: true
    }
);

export const UserModel = mongoose.model('User', UserShema);