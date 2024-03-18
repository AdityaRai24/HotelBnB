import mongoose from "mongoose";

const favSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    homeId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Home",
      }],
  },{ timestamps: true });

const Favourite = mongoose.models.Favourite || mongoose.model("Favourite", favSchema);
export default Favourite;
