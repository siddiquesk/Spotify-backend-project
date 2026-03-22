const mongoose =require("mongoose");


const connectDb =async(req,res)=>{
try{
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Db Connected");
}catch(err){
  console.log(err);
}
}

module.exports=connectDb;