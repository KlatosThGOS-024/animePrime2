"use client";
import { addCardOne } from "@/functions/Anime.function";
import { getAnimeCard } from "@/hooks/Anime";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const CallBackend = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootState) => {
    return state.AnimeCardReducerOne;
  });
  useEffect(() => {
    const getAnime = async () => {
      try {
        if (selector && selector.length > 0) {
          console.log("selector present", selector);
        } else {
          const page = 1;
          const response = await getAnimeCard(page);
          console.log("selector present", response);
          if (response?.data.data) {
            dispatch(addCardOne(response.data.data));
          }
        }
      } catch (error) {
        console.error("Error fetching anime data:", error);
      }
    };

    getAnime();
  }, []);

  return <div>CallBackend</div>;
};
