import mongoose from "mongoose"

const reservationSchema = mongoose.Schema({
    startDate:{
        type: Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    homeId:{
       type: mongoose.Schema.Types.ObjectId,
       ref:"Home",
    }
},{timestamps:true})

const Reservation = mongoose.models.Reservation || mongoose.model("Reservation",reservationSchema)
export default Reservation