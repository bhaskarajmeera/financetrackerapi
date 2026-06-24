import mongoose from "mongoose";

const MONGO_URL="mongodb+srv://bhaskar92in:Dviti1$ix2025@businesexpense.iurtpn7.mongodb.net/?appName=BUSINESEXPENSE";


    const conMongoDb=async()=>{
    try{
        const conn=  await mongoose.connect(MONGO_URL);
        conn && console.log("mongoDB connected");
    }catch(error){console.log(error)}
}

export default conMongoDb;