import mongoose from "mongoose";

const HomeSchema = mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    guestsCount: {
      type: Number,
    },
    bedroomCount: {
      type: Number,
    },
    bathroomCount: {
      type: Number,
    },
    country: {
      type: String,
    },
    state: {
      type: String,
    },
    city: {
      type: String,
    },
    cityLong: {
      type: String,
    },
    cityLat: {
      type: String,
    },
    photo: {
      type: String,
    },
    price: {
      type: Number,
    },
    categoryName: {
      type: String,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    addedCategory: {
      type: Boolean,
      default: false,
    },
    addedDescription: {
      type: Boolean,
      default: false,
    },
    addedLocation: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Home = mongoose.models.Home || mongoose.model("Home", HomeSchema);
export default Home;
