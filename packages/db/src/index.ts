import mongoose from "mongoose";
import dotenv from "dotenv";
import AnimeCard from "./models/AnimeCard.model";
import { User } from "./models/User.model";

const dbConnection = async () => {
  try {
    const databaseUrl =
      "mongodb+srv://new:xP0U3KZJQM7yFqAl@cluster0.une21tv.mongodb.net/";
    const connection = await mongoose.connect(databaseUrl);
    console.log("dssgsgjiodfgiosdghiosdhgoidgoisdhgiusdghksdhsd", databaseUrl);
    console.log("✅ MongoDB Connected:", connection.connection.host);
    return connection.connection.readyState;
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    return null;
  }
};

export { AnimeCard, User, dbConnection };
