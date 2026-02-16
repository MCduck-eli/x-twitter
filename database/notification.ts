import { Schema, model, models } from "mongoose";

const notification = new Schema(
    {
        body: { type: String },
        user: [
            {
                type: Schema.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true },
);

const Notification = models.Notification || model("Notification", notification);
export default Notification;
