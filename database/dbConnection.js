import mongoose from "mongoose";

const dbConnection = async () => {
    try {
        if (!process.env.DBURL) {
            console.log("DBURL is not defined");
        } else {
            console.log("DBURL is loaded:", process.env.DBURL);
            await mongoose.connect(process.env.DBURL);
            console.log("db connected");
        }
    } catch (error) {
        console.log("Error while connecting to the database:", error);
    }
};

export default dbConnection;
