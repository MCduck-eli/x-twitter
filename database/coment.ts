import mongoose, { Schema, model, models } from "mongoose";

const ComentSchema = new Schema(
    {
        body: { type: String },
        user: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        post: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Post",
            },
        ],
    },
    { timestamps: true },
);

const Comment = models.Coment || model("Comment", ComentSchema);
export default Comment;
