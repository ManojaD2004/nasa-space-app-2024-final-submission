// components/Overlay.js
import { TypeAnimation } from "react-type-animation";
import "../styles/Overlay.css"; // Adjusted the path correctly

const Overlay = () => {
  return (
    <div className=" overflow-hidden m-0 p-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Habitable Exoplanets Explorer!!",
              1000,
              "Get Ready For the journey :)",
              1000,
            ]}
            speed={30}
            deletionSpeed={30}
            repeat={Infinity}
            cursor={true} // Enable cursor
            cursorColor="white" //
            wrapper="h1"
            className="m-0 p-0 text-6xl font-medium tracking-tight "
          />
          {/* <h1 className="m-0 p-0 text-[15em] font-medium tracking-tight">hello</h1> */}
        </div>

        <div className="absolute bottom-10 right-10 text-xs">25/02/2022</div>
      </div>
    </div>
  );
};

export default Overlay;
