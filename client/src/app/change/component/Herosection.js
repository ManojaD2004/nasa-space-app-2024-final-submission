import React from "react";
import { Poppins } from "next/font/google";

const poppinsFont = Poppins({ subsets: ["latin"], weight: "400" });

const Herosection = () => {
  return (
    <div>
      <div className="pt-[]">
        <div className="relative w-full h-screen bg-cover bg-no-repeat bg-[url('https://science.nasa.gov/wp-content/uploads/2023/04/heic1916a-jpg.webp?w=4096&format=png')] bg-[center_20%] flex items-center">
          {/* Black Filter Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Content */}
          <div className="relative z-10 text-white p-8 flex flex-col">
            <div>
              <span className="font-bold text-4xl md:text-7xl ">
                Change the default
                <br />
                Values 
              </span>
            </div>
            <br />
            <div className={poppinsFont.className}>
              <span className="text-[#b8b9bb] text-sm md:text-base">
                {`Change the instrument and assumed values, and see the live changes that is applied to NASA exo-planet archieve data.`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
