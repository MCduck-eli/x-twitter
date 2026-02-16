import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String },
        username: { type: String },
        email: { type: String },
        password: { type: String },
        profileimage: { type: String },
        bio: { type: String },
        location: { type: String },
        hasNotification: { type: Boolean },

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
