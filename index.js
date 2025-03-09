import dotenv from 'dotenv';
dotenv.config(); 
import cors from 'cors'
import express from 'express';
import dbConnection from './database/dbConnection.js';
const app = express();
const port = process.env.PORT;

app.use(cors())
app.use(express.json());

// Import routes
import userRouter from './router/user.js';
app.use("/api", userRouter);

app.listen(port, () => {
    console.log("start the server");
    dbConnection();
});
