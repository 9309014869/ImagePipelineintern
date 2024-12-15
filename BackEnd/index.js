import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import ConnectionDB from './Config/db.js';
const app = express();
ConnectionDB();
app.use(express.json());

app.use(cors(
    { 
        origin: "http://localhost:5173" ,
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true
    }
));



import User from './Routes/user.router.js';
console.log("i am in index.js file");
app.use('/api/v1/user', User);///http://localhost:3000/api/v1/user/getUserhttp://localhost:3000/api/v1/user/create


app.listen(3000,() => {
    console.log("Server Started on port 3000")
})

