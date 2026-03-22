require("dotenv").config(); 
const app=require("./src/app");
const connectDb = require("./src/db/db");

let PORT=process.env.PORT || 8080;
console.log(process.env.IMAGE_KIT_PRIVATE_KEY);
app.listen(PORT,()=>{
  connectDb();
  console.log(`server is running on ${PORT}`);
})