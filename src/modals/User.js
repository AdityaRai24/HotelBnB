import mongoose from "mongoose"
import Reservation from "./Reservation"
const userSchema = mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    profilePic:{
        type:String,
    },
    loginType:{
        type:String,
        required:true
    },
    Homes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Home"
    }],
    Favourites:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Home"
    }],
    Reservations:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:Reservation
    }]

},{timestamps:true})

const User = mongoose.models.User || mongoose.model("User",userSchema)
export default User