import { Request, Response } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import fs from "fs";
import path from "path";
import { ApiError } from "../../utils/ApiError";
import prisma from "db";

import { ApiResponse } from "../../utils/ApiResponse";
const getAnimeFromJSON = () => {
  try {
    const filePath = path.join(__dirname, "Anime.json");
    let animeList = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, "utf8");
      animeList = fileContent ? JSON.parse(fileContent) : [];
    }
    return animeList;
  } catch (error) {
    console.log(error);
  }
};
console.log(getAnimeFromJSON());
const saveAmimeCard = asyncHandler(async (req: Request, res: Response) => {
  try {
    //       const RecentReleasedAnimeInstance = new RecentReleased()
    const animeList = getAnimeFromJSON();
    console.log(animeList);
    const saveAnimeCard = await prisma.animeCard.createMany({
      data: animeList.map((anime: any) => {
        title: anime.title;
        image: anime.image;
        timeago: anime.timeago;
        typez: anime.typez || null;
        subDub: anime.subDub;
      }),
    });
    res.send(
      new ApiResponse(true, "Successfully saved anime data", saveAnimeCard)
    );
  } catch (error) {
    res.send(new ApiError("Something went wrong", 400));
  }
});

export { saveAmimeCard };
