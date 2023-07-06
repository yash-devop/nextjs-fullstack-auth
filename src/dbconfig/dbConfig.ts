import mongoose from "mongoose";
require('dotenv');
const connect =async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!) /* ! in typescript means hey i will takecare of it. it will be always available. */
        const connection= mongoose.connection;
        connection.on("connected",()=>{
            console.log('MongoDB Connected Succesfully');
        });
        connection.on("error",(err)=>{
            console.log('MongoDB Connection error. Please make sure that mongdb is running',err);
            process.exit();
        });
    } catch (error) {
        console.log("something went wrong");
        console.log(error);
    }
}
export default connect;