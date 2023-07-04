import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";    

import postRoutes from "./Routes/Posts.js";
import userRoutes from "./Routes/users.js";


const app= express();

app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

const MONGO_URI = 'mongodb+srv://emirhanozt01:EMIRHAN123@clustersosyal.qjw6h7r.mongodb.net/sosyalDB';

const PORT = process.env.PORT || 4000;

mongoose.connect(MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server ${PORT}. portunda başlatıldı`);
        });
    })
    .catch((err) => {
        console.log(err);
    });