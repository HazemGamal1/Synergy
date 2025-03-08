import mongoose from "mongoose"

export const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI!);
    }catch(error : any)
    {
        process.exit(1);
    }
}
