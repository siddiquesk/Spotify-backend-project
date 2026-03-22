const express = require("express");
const app=express();
const cookieParser =require("cookie-parser");
const userRoute =require("../src/routes/userRoute");
const musicRoute =require("../src/routes/musicRoute");
require("dotenv").config();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user",userRoute);
app.use("/api/music",musicRoute);

module.exports=app;