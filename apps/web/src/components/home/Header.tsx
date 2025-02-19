import React from "react";
import { Nav } from "./Nav";
import { FaPlus } from "react-icons/fa";

export const Header = () => {
  return (
    // <section>
    //   <Nav />

    //   <div className="relative w-full h-screen">
    //     <img
    //       src="https://comicbook.com/wp-content/uploads/sites/4/2024/11/Solo-Leveling-Reawakening-anime-movie.png"
    //       alt="Movie poster"
    //       className="absolute inset-0 w-full h-screen  object-cover"
    //     />

    //     <div className="absolute inset-0 bg-gradient-to-r from-[#00050d] via-[#00050d29] to-transparent">
    //       <div className=" absolute bottom-[35%] left-[5%]  ">
    //         <div className="w-[496px] ">
    //           <h3 className="text-[#0070F2] font-[600] text-[32px]">
    //             AnimePrime
    //           </h3>
    //           <p className=" text-[#F94700] text-[48px] ml-[28px] font-[600]">
    //             Solo leveling
    //           </p>
    //           <span className="text-white ml-[64px] font-[500]">
    //             Japense(Sub)| English(Dub)
    //           </span>
    //           <p className="mt-[28px] text-white font-[500]  break-words">
    //             Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
    //             obcaecati voluptates doloribus labore sequi laboriosam dicta,
    //           </p>
    //           <div className="flex mt-[28px] gap-3">
    //             <button
    //               className=" flex flex-col p-3 px-5 text-[21px] rounded-lg font-[600]
    //              text-white bg-[#33373D]"
    //             >
    //               <span>Join Prime </span>
    //               <span>Watch now</span>{" "}
    //             </button>
    //             <button className="px-7 bg-[#33373D]  rounded-full ">
    //               <FaPlus
    //                 className="w-[21px]
    //               h-[21px] text-white"
    //               />
    //             </button>

    //             <button className="px-7 bg-[#33373D]  rounded-full ">
    //               <FaPlus className="w-[21px] h-[21px] text-white" />
    //             </button>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <section>
      <Nav />

      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://comicbook.com/wp-content/uploads/sites/4/2024/11/Solo-Leveling-Reawakening-anime-movie.png"
              className=" inset-0 w-full h-screen  object-cover"
              alt="..."
            />
          </div>
          <div className="carousel-item ">
            <img
              src="https://comicbook.com/wp-content/uploads/sites/4/2024/11/Solo-Leveling-Reawakening-anime-movie.png"
              className=" inset-0 w-full h-screen  object-cover"
              alt="..."
            />
          </div>
          <div className="carousel-item ">
            <img
              src="https://cdn.wallpaper.tn/large/D%C3%A9mon-Slayer-Desktop-Wallpaper-4K-1737.jpg"
              className=" inset-0 w-full h-screen  object-cover"
              alt="..."
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#00050d] via-[#00050d29] to-transparent">
          <div className=" absolute bottom-[35%] left-[5%]  ">
            {" "}
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
                  <span>Join Prime </span>
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
  );
};
