import { Schema, model, models } from "mongoose";
import { boolean } from "zod";

const userSchema = new Schema(
    {
        name: {
            type: String,
        },

        username: {
            type: String,
        },

        email: {
            type: String,
        },

        password: {
            type: String,
        },

        profileimage: {
            type: String,
        },
        bio: { type: String },
        location: { type: String },
        hasNotification: { type: boolean },
        notification: [
            {
                type: Schema.ObjectId,
                ref: "Notification",
            },
        ],
    },
    { timestamps: true },
);

const User = models.User || model("User", userSchema);
export default User;
