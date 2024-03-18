import mongoose from "mongoose"

export async function Connection(){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to database successfully")
    } catch (error) {
        console.log("Error while connecting to database")
    }
}