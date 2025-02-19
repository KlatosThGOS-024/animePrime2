"use client";
import React, { useRef } from "react";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const images = [
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
  "/images/soloLeveling.png",
];

const AnimeCard = () => {
  return (
    <div className="w-full bg-gray-900 text-white rounded-lg p-4 shadow-lg">
      {/* Title & Tag */}
      <h2 className="text-lg font-bold">Hana wa Saku, Shura no Gotoku</h2>
      <div className="flex items-center gap-2 mt-1">
        <span className="text-sm text-gray-300">23 min</span>
        <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
          TV Show
        </span>
      </div>

      {/* Description */}

      {/* Metadata */}
      <div className="mt-1 text-sm">
        <p>
          <span className="text-gray-400">Status:</span>{" "}
          <span className="text-white">Ongoing</span>
        </p>
        <p>
          <span className="text-gray-400">Genres:</span>{" "}
          <span className="font-bold text-white">Drama</span>
        </p>
        <p>
          <span className="text-gray-400">Studio:</span>{" "}
          <span className="font-bold text-white">Studio Bind</span>
        </p>
      </div>

      {/* Button */}
      <button className="w-full bg-gray-700 hover:bg-gray-600 text-white text-sm font-semibold py-2 rounded-lg mt-4 flex items-center justify-center gap-2">
        <i className="fas fa-chevron-down"></i> More Details
      </button>
    </div>
  );
};

export default AnimeCard;
const Carousel = ({ imgSrc }: { imgSrc: string }) => {
  return (
    <div className=" relative overflow-visible">
      <img className="w-[320px] h-[184px] rounded-lg" src={imgSrc} />
    </div>
  );
};

export const RecentlyRelased = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const leftSlider = () => {
    let left = document.getElementById("sliderl");
    left?.scrollBy(350, 0);
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= 500;
    }
  };

  const rightSlider = () => {
    let left = document.getElementById("sliderr");
    left?.scrollBy(350, 0);
    if (sliderRef.current) {
      sliderRef.current.scrollTop += 2000;
      console.log("gelo");
    }
  };

  return (
    <section className="px-[48px] relative  text-white bg-[#00050D] ">
      <div>
        <h3 className="font-[600] my-[31px] text-[28px]">Recently Released</h3>
        <p className="font-[600] mb-2 text-[24px]">
          Popular recently released anime
        </p>
      </div>
      <div className="w-full  overflow-x-auto scrollbar-hide">
        {/* <div id="sliderl" className="  bottom-[25%] left-[0.5]">
          <MdChevronLeft
            onClick={leftSlider}
            className="cursor-pointer bg-white fill-black rounded-full hover:opacity-90"
            size={40}
          />
        </div> */}
        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div
              ref={sliderRef}
              className="flex gap-[28px] z-20  w-max overflow-x-auto flex-nowrap"
            >
              {images.map((img, index) => (
                <div className="hover:scale-110" key={index}>
                  <Carousel imgSrc={img} />
                </div>
              ))}
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* <div id="sliderr" className="   bottom-[25%] right-[0.5]">
          <MdChevronRight
            onClick={rightSlider}
            className="cursor-pointer bg-white fill-black rounded-full hover:opacity-90"
            size={40}
          />
        </div> */}
      </div>
    </section>
  );
};
export const ActionGenre = () => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const leftSlider = () => {
    let left = document.getElementById("sliderl");
    left?.scrollBy(350, 0);
    // if (sliderRef.current) {
    //   sliderRef.current.scrollLeft -= 500;
    // }
  };

  const rightSlider = () => {
    let left = document.getElementById("sliderr");
    left?.scrollBy(350, 0);
    // if (sliderRef.current) {
    //   sliderRef.current.scrollTop += 2000;
    //   console.log("gelo");
    // }
  };

  return (
    <section className="px-[48px] mt-[64px] text-white bg-[#00050D] relative">
      <div>
        <p className="font-[600] mb-2 text-[24px]">
          Popular recently released anime
        </p>
      </div>
      <div className="w-full  overflow-x-auto scrollbar-hide">
        <div
          id="sliderl"
          className=" absolute z-20 bottom-[25%] left-[0.5]"
          onClick={leftSlider}
        >
          <MdChevronLeft
            // onClick={leftSlider}
            className="cursor-pointer bg-white fill-black rounded-full hover:opacity-90"
            size={40}
          />
        </div>
        <div
          ref={sliderRef}
          className="flex gap-[28px] w-max overflow-x-auto flex-nowrap"
        >
          {images.map((img, index) => (
            <div key={index}>
              <Carousel imgSrc={img} />
            </div>
          ))}
        </div>
        <div
          id="sliderr"
          onClick={rightSlider}
          className=" absolute z-20 bottom-[25%] right-[0.5]"
        >
          <MdChevronRight
            className="cursor-pointer bg-white fill-black rounded-full hover:opacity-90"
            size={40}
          />
        </div>
      </div>
    </section>
  );
};
