"use client";
import { getAnimeCard } from "@/hooks/Anime";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    const getAnime = async () => {
      try {
        const response = await getAnimeCard();
        console.log(response);
      } catch (error) {}
    };
  });

  return <div>hello</div>;
}
