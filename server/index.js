import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import postRoute from "./routes/post.route.js";
import traineeRoute from "./routes/trainee.route.js";
import { app, server } from "./socket/socket.js";
import path from "path";

dotenv.config();


//const port = process.env.PORT || 10000;
const port= 10000;

const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
const corsOptions = {
    origin: "http://localhost:5173", //frontend origin or port number
    credentials: true
}
app.use(cors(corsOptions));

// yha pr apni api ayengi routes folder ki
app.use("/api/v1/user", userRoute);
app.use("/api/v1/post", postRoute);
app.use("/api/v1/trainee", traineeRoute);

//app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req,res)=>{
   // res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
})


server.listen(port,'0.0.0.0', () => {
    connectDB();
    console.log(`Server listen at port ${port}`);
});
