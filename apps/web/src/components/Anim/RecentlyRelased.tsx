"use client";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Carousel = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div className="group relative overflow-visible">
      <img className="w-[320px] h-[184px] rounded-lg" src={imgSrc} />
    </div>
  );
};

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
          {images.map((img) => {
            return (
              <div>
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
          {images.map((img) => {
            return (
              <div>
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
