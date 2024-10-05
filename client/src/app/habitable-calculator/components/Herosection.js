import React from "react";
import { Poppins } from "next/font/google";
import Header from "@/app/components/Header";

const poppinsFont = Poppins({ subsets: ["latin"], weight: "400" });

const Herosection = () => {
  return (
    <div>
      <Header />
      <div className="">
        <div className="relative w-full h-screen bg-cover bg-no-repeat bg-[url('https://science.nasa.gov/wp-content/uploads/2024/10/moon-and-pacific-ocean-earth-photo-from-iss-matthew-dominic.jpg?w=2560&format=webp')] bg-[center_20%] flex items-center">
          {/* Black Filter Overlay */}
          <div className="absolute inset-0 bg-black opacity-50"></div>

          {/* Content */}
          <div className="relative z-10 text-white p-8 flex flex-col">
            <div>
              <span className="font-bold text-4xl md:text-7xl ">
                Habitable Planet
                <br />
                Calculator
              </span>
            </div>
            <br />
            <div className={poppinsFont.className}>
              <span className="text-[#b8b9bb] text-sm md:text-base">
                {`We have developed an algorithm which helps us to determine whether the newly detected planet is habitable or not.You just need to put the data in the below input fields and press calculate button.It returns the probability that the planet is habitable or not. Our algorithm is 91% accurate.`}
              </span>
            </div>
          </div>
        </div>

        <div className="text-white px-[20px] md:px-[50px] py-[40px]">
          <p className="font-light text-lg">Facts about Habitable Planets</p>
          <div className="flex flex-col md:flex-row items-center justify-center pt-[30px] gap-[30px] md:gap-[70px]">
            <div className="flex-col h-[200px]">
              <div className="text-[18px] md:text-[20px] underline decoration-dashed underline-offset-4">
                Total Number of Exoplanets
              </div>
              <div className="pt-[10px] font-mono text-[14px] md:text-[15px]">
                As of October 2024,over 5,600 confirmed exoplanets
              </div>
            </div>
            <div className="flex-col h-[200px]">
              <div className="text-[18px] md:text-[20px] underline decoration-dashed underline-offset-4">
                Estimated Habitable Planets
              </div>
              <div className="pt-[10px] font-mono text-[14px] md:text-[15px]">
                300 million potentially habitable planets
              </div>
            </div>
            <div className="flex-col h-[200px]">
              <div className="text-[18px] md:text-[20px] underline decoration-dashed underline-offset-4">
                Nearest Habitable Planet
              </div>
              <div className="pt-[10px] font-mono text-[14px] md:text-[15px]">
                Proxima Centauri b, 4.24 light-years away from Earth.
              </div>
            </div>
            <div className="flex-col h-[200px]">
              <div className="text-[18px] md:text-[20px] underline decoration-dashed underline-offset-4">
                Last Detected Habitable Planet
              </div>
              <div className="pt-[10px] font-mono text-[14px] md:text-[15px]">
                TOI 700 e, which was confirmed in January 2023.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Herosection;
