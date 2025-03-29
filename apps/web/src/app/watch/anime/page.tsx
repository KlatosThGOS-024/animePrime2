import { EpisodeComponent } from "@/components/Anime/EpisodeComponent";
import { Nav } from "@/components/home/Nav";
import React from "react";
import { FaPlus } from "react-icons/fa";
const AnimeBody = () => {
  return (
    <section>
      <EpisodeComponent />
    </section>
  );
};
const page = () => {
  return (
    <>
      {" "}
      <section>
        <Nav />

        <div className="relative w-full h-screen">
          <div className=" bg-orange-400 w-full h-full flex">
            {" "}
            <img
              src="https://cdn.myanimelist.net/images/anime/1038/143308l.jpg?_gl=1*1gmowvn*_gcl_au*MjA0NDg3NzQ4MS4xNzQwMzA5MDc4*_ga*MTAwNTA1ODA5NS4xNzM5ODgxMTUw*_ga_26FEP9527K*MTc0MDMwOTA3Ni4xLjEuMTc0MDMwOTEyOS43LjAuMA.."
              alt="Movie poster"
              className=" w-1/3  h-screen"
            />
            <img
              src="https://cdn.myanimelist.net/images/anime/1560/146082l.jpg?_gl=1*1c126gk*_gcl_au*MjA0NDg3NzQ4MS4xNzQwMzA5MDc4*_ga*MTAwNTA1ODA5NS4xNzM5ODgxMTUw*_ga_26FEP9527K*MTc0MDMwOTA3Ni4xLjEuMTc0MDMwOTEzNi42MC4wLjA.."
              alt="Movie poster"
              className=" w-1/3  h-screen"
            />
            <img
              src="https://cdn.myanimelist.net/images/anime/1026/146459.jpg"
              alt="Movie poster"
              className=" w-1/3  h-screen"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#00050d] via-[#00050d29] to-transparent">
            <div className=" absolute bottom-[35%] left-[5%]  ">
              <div className="w-[496px] ">
                <h3 className="text-[#0070F2] font-[600] text-[32px]">
                  AnimePrime
                </h3>
                <p className=" text-[#F94700] text-[48px] ml-[28px] font-[600]">
                  Solo leveling
                </p>
                <span className="text-white ml-[64px] font-[500]">
                  Japense(Sub)| English(Dub)
                </span>
                <p className="mt-[28px] text-white font-[500]  break-words">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
                  obcaecati voluptates doloribus labore sequi laboriosam dicta,
                </p>
                <div className="flex mt-[28px] gap-3">
                  <button
                    className=" flex flex-col p-3 px-5 text-[21px] rounded-lg font-[600]
                 text-white bg-[#33373D]"
                  >
                    <span></span>
                    <span>Watch now</span>{" "}
                  </button>
                  <button className="px-7 bg-[#33373D]  rounded-full ">
                    <FaPlus
                      className="w-[21px]
                  h-[21px] text-white"
                    />
                  </button>

                  <button className="px-7 bg-[#33373D]  rounded-full ">
                    <FaPlus className="w-[21px] h-[21px] text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimeBody />
    </>
  );
};
export default page;
