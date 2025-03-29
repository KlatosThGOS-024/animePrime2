"use client";
import React, { useRef, useState } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useSelector } from "react-redux";

import { RootState } from "@/store/store";
interface AnimeCardInterface {
  title?: string;
  image?: string;
  timeago?: string;
  typez?: string;
  subDub?: string;
}
const Carousel = ({ imgSrc }: { imgSrc: string }) => {
  console.log(imgSrc);
  return (
    <div className="group relative overflow-visible">
      <img
        loading="lazy"
        className="w-[304px] h-[304px] rounded-lg"
        src={imgSrc}
      />
    </div>
  );
};
const image2s = [
  "https://gogoanime.by/wp-content/uploads/2024/03/saijaku-tamer-wa-gomi-hiroi-no-tabi-wo-hajimemashita.webp",

  "https://i0.wp.com/gogoanime.by/wp-content/uploads/2025/01/Ishura-2nd-Season.jpg?resize=246,350",
];
export const ActionGenre = () => {
  const rightSlider = () => {
    var rightSlide = document.getElementById("sliderr");
    rightSlide?.scrollBy({ left: +1200, behavior: "smooth" });
  };
  const leftSlider = () => {
    var leftSlide = document.getElementById("sliderr");
    leftSlide?.scrollBy({ left: -1200, behavior: "smooth" });
  };
  return (
    <section className="px-[48px] relative">
      <div>
        <h3 className="font-[600] mt-[64px] text-[28px]"> </h3>

        <p className="font-[600] mb-2 text-[24px]">Popular ActionGenre anime</p>
      </div>
      <div id="sliderr" className=" overflow-x-scroll scrollbar-hide">
        <div className=" absolute z-20 bottom-[25%] left-[0.5]">
          <MdChevronLeft
            onClick={leftSlider}
            className="cursor-pointer bg-white fill-black rounded-full hover:opacity-90"
            size={40}
          />
        </div>
        <div className="flex gap-[28px]  w-max flex-nowrap">
          {image2s.map((img, index) => {
            return (
              <div key={index}>
                <Carousel imgSrc={img} />
              </div>
            );
          })}
        </div>
        <div className=" absolute z-20 bottom-[25%] right-[0.5]">
          <MdChevronRight
            onClick={rightSlider}
            className="cursor-pointer bg-white fill-black rounded-full hover:opacity-90"
            size={40}
          />
        </div>
      </div>
    </section>
  );
};

export const RecentlyRelased = () => {
  const selectorImage = useSelector((state: RootState) => {
    return state.AnimeCardReducerOne;
  });
  const rightSlider = () => {
    var rightSlide = document.getElementById("sliderr1");
    rightSlide?.scrollBy({ left: +1200, behavior: "smooth" });
  };
  const leftSlider = () => {
    var leftSlide = document.getElementById("sliderr1");
    leftSlide?.scrollBy({ left: -1200, behavior: "smooth" });
  };
  return (
    <section className="px-[48px] relative">
      <div>
        <h3 className="font-[600] my-[31px] text-[28px]">Recently Released</h3>

        <p className="font-[600] mb-2 text-[24px]">
          Popular recently released anime
        </p>
      </div>
      <div id="sliderr1" className=" overflow-x-scroll scrollbar-hide">
        <div className=" absolute z-20 bottom-[25%] left-[0.5]">
          <MdChevronLeft
            onClick={leftSlider}
            className="cursor-pointer bg-white fill-black rounded-full hover:opacity-90"
            size={40}
          />
        </div>
        <div className="flex gap-[28px]  w-max flex-nowrap">
          {selectorImage.map((img, index) => {
            return (
              <div key={index}>
                {img.image && <Carousel imgSrc={img.image} />}
              </div>
            );
          })}
        </div>
        <div className=" absolute z-20 bottom-[25%] right-[0.5]">
          <MdChevronRight
            onClick={rightSlider}
            className="cursor-pointer bg-white fill-black rounded-full hover:opacity-90"
            size={40}
          />
        </div>
      </div>
    </section>
  );
};
