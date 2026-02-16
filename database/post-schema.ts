import mongoose, { Schema, model, models } from "mongoose";

const postSchema = new Schema(
    {
        body: { type: String },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true },
);

const Post = models.Post || model("Post", postSchema);
export default Post;
