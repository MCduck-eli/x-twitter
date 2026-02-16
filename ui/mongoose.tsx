import mongoose, { ConnectOptions } from "mongoose";

const isConnected = false;

export default function connectedToDatabase() {
    mongoose.set("strict", true);
    if (!process.env.MONGO_URL) {
        return console.log("Mongo db is not defined");
    }

    if (isConnected) {
        return;
    }

    try {
        const option: ConnectOptions = {
            dbName: "x-twitter",
            autoCreate: true,
        };
        mongoose.connect(process.env.MONGO_URL, option);
    } catch (error) {
        console.log(error);
    }
}
