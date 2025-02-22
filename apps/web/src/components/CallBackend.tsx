"use client";
import { addCardOne } from "@/functions/Anime.function";
import { getAnimeCard } from "@/hooks/Anime";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export const CallBackend = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAnime = async () => {
      try {
        const response = await getAnimeCard();
        if (response) {
          dispatch(addCardOne(response.data));
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    getAnime();
  }, [dispatch]);

  return <div>CallBackend</div>;
};
