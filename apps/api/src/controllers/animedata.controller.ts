import { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import fs from "fs";
import path from "path";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { AnimeCard } from "@repo/db";
import { AnimeCardInterface } from "@repo/common/src/Anime";
const getAnimeFromJSON = () => {
  try {
    const filePath = path.resolve(__dirname, "../../../../Anime.json"); // Go up two levels to the project root
    let animeList = [];
    console.log(filePath);
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      animeList = fileContent ? JSON.parse(fileContent) : [];
    }

    return animeList;
  } catch (error) {
    console.log("Error reading Anime.json:", error);
  }
};

const saveAnimeCard = asyncHandler(async (req: Request, res: Response) => {
  try {
    const animeList: AnimeCardInterface[] = getAnimeFromJSON();
    console.log(animeList);
    const animeCardResponse = await AnimeCard.insertMany(
      animeList.map((anime) => ({
        title: anime.title,
        image: anime.image,
        timeago: anime.timeago,
        typez: anime.typez,
        subDub: anime.subDub,
      }))
    );

    console.log("✅ Anime data inserted:", animeCardResponse);

    res.send(
      new ApiResponse(true, "Successfully saved anime data", animeCardResponse)
    );
  } catch (error: any) {
    res.send(new ApiError("Something went wrong", 400, error.message)); // Avoid using @ts-ignore
  }
});
const getAnimeCard = asyncHandler(async (req: Request, res: Response) => {
  try {
    const animeCardResponse = await AnimeCard.find({});
    //@ts-ignore
    console.log("✅ Anime data inserted:", animeCardResponse);

    res.send(
      new ApiResponse(
        true,
        "Successfully retreved anime data",
        //@ts-ignore

        animeCardResponse
      )
    );
  } catch (error: any) {
    res.send(new ApiError("Something went wrong", 400, error.message));
  }
});
export { saveAnimeCard, getAnimeCard };
