"use client";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const EpisodeBox = ({ eNo }: { eNo: string }) => {
  return (
    <div>
      <div className="flex gap-4 w-[60%]">
        <img
          className=""
          src="https://cdn.myanimelist.net/images/anime/1244/138851.jpg"
        />
        <div>
          <p className="text-[28px] font-[600]">December 19 2024 23min</p>
          <p className=" text-[#76787B] text-[24px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Consequuntur, explicabo facilis!
          </p>
          <h2 className="text-[18px]">First Episode {eNo}</h2>
        </div>
      </div>
    </div>
  );
};

export const ShowEpisodeModal = ({
  onSelect,
}: {
  onSelect: (range: number) => void;
}) => {
  let Epnum = 0;
  let length = 0;
  let totalEpNum = 140;
  if (totalEpNum > 500) {
    Epnum = 50;
  } else if (totalEpNum >= 100 && 500 >= totalEpNum) {
    Epnum = 25;
    length = totalEpNum / 20;
  } else {
    Epnum = 10;
    length = totalEpNum / 10;
  }
  const episodeRanges = Array.from({ length }, (_, i) => [
    i * Epnum + 1,
    (i + 1) * Epnum,
  ]);

  return (
    <div className="absolute right-0 mt-2 w-[200px]  shadow-lg rounded-lg p-2">
      {episodeRanges.map(([start, end]) => (
        <div
          key={start}
          className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
          onClick={() => onSelect(end)}
        >
          {start}-{end}
        </div>
      ))}
    </div>
  );
};

export const EpisodeComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const numbers = Array.from({ length: 50 }, (_, i) => i + 1);
  const [episodeNumber, setEpisodeNumber] = useState(numbers);

  const handleSelect = (newCount: number) => {
    const start = Math.max(newCount - 50 + 1, 1);
    setEpisodeNumber(Array.from({ length: 50 }, (_, i) => start + i));
    setShowModal(false);
  };

  return (
    <section className="relative overflow-x-hidden">
      <div className="w-full mt-[64px] px-[96px] h-screen">
        {/* Episode Dropdown */}
        <div
          className="w-fit bg-[#A0A1A1] px-[28px] rounded-lg flex items-center py-[18px] font-[600] gap-3 text-[21px] hover:bg-white hover:text-[#A0A1A1] active:opacity-90 
          cursor-pointer absolute my-[64px] mr-[64px] top-0 right-0"
          onClick={() => setShowModal(!showModal)}
        >
          <h3>Episode Number</h3>
          <FaChevronDown />
        </div>

        {/* Show Modal when clicked */}
        {showModal && <ShowEpisodeModal onSelect={handleSelect} />}

        {/* Episode List */}
        <div className="grid grid-cols-1 gap-4 mt-16">
          {episodeNumber.map((eNo1) => (
            <EpisodeBox key={eNo1} eNo={`${eNo1}`} />
          ))}
        </div>
      </div>
    </section>
  );
};
