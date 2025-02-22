import mongoose, { Model } from "mongoose";

const animeCardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      index: true,
    },
    image: {
      type: String,
    },
    typez: {
      type: String,
      trim: true,
    },
    subDub: {
      type: String,
    },
    timeago: {
      type: String,
    },
  },
  { timestamps: true }
);

const AnimeCard = mongoose.model("AnimeCard", animeCardSchema);
export default AnimeCard;
