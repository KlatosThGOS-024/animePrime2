"use client";
import { stringify } from "querystring";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const EpisodeBox = ({ eNo }: { eNo: string }) => {
  return (
    <div>
      <div className="flex gap-4 w-[60%]">
        <img
          className="h-[70%] w-[15%]"
          src="https://cdn.myanimelist.net/images/anime/1244/138851.jpg"
        />
        <div>
          <p className="text-[28px] font-[600]">December 19 2024 23min</p>
          <p className=" text-[#76787B] text-[24px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, explicabo facilis!
          </p>
          <h2 className="text-[18px]">First Episode{eNo}</h2>
        </div>
      </div>
    </div>
  );
};
export const EpisodeComponent = () => {
  const [showEpisode, setShowEpisode] = useState(50);
  const numbers = Array.from({ length: showEpisode }, (_, i) => i + 1);
  const [episodeNumber, setEpisodeNumber] = useState(numbers);

  return (
    <section className="relative  overflow-x-hidden">
      <div className="w-full mt-[64px] px-[96px] h-screen">
        <div
          className="w-fit bg-[#A0A1A1] px-[28px] rounded-lg flex items-center py-[18px] font-[600] gap-3 text-[21px] hover:bg-white hover:text-[#A0A1A1] active:opacity-90 
        cursor-pointer absolute
         my-[64px] mr-[64px] top-0 right-0"
        >
          <h3>Episode Number</h3>
          <FaChevronDown />
          <div></div>
        </div>
        <div className=" grid grid-cols-1 gap-4">
          {episodeNumber.map((eNo1) => {
            return <EpisodeBox eNo={`${eNo1}`} />;
          })}
        </div>
      </div>
    </section>
  );
};
