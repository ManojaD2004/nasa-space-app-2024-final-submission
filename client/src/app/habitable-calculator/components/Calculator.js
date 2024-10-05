"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: "400" });
function Calculator({ backEndLink }) {
  const [output, setOutput] = useState(0);
  const [inputs, setInputs] = useState({
    R_star: "",
    L_star: "",
    T_eff: "",
    R_planet: "",
    M_planet: "",
    semi_major_axis: "",
    eccentricity: "",
    es: "",
    inclination: "90.0",
    albedo: "0.30",
    distance: "",
    D_telescope: "6.0",
    wavelength: "550e-9",
    IWA: "0.050",
    OWA: "1.000",
    contrast_limit: "1e-10",
    snr0: "100",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare payload with correct types
    const payload = {
      R_star: parseFloat(inputs.R_star),
      L_star: parseFloat(inputs.L_star),
      T_eff: parseInt(inputs.T_eff, 10),
      R_planet: parseFloat(inputs.R_planet),
      M_planet: parseFloat(inputs.M_planet),
      semi_major_axis: parseFloat(inputs.semi_major_axis),
      es: parseFloat(inputs.es),
      eccentricity: parseFloat(inputs.eccentricity),
      distance: parseFloat(inputs.distance),
      inclination: parseFloat(inputs.inclination),
      albedo: parseFloat(inputs.albedo),
      D_telescope: parseFloat(inputs.D_telescope),
      wavelength: parseFloat(inputs.wavelength),
      IWA: parseFloat(inputs.IWA),
      OWA: parseFloat(inputs.OWA),
      contrast_limit: parseFloat(inputs.contrast_limit),
      snr0: parseFloat(inputs.snr0),
    };

    try {
      const response = await fetch(
        `${backEndLink}/habitable-exoplanet-calculator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const output1 = await response.json();
      setOutput(output1.data);
      console.log(output1);
      if (output1.data.result == "1" || output1.data.result == "2") {
        toast.success("It is a habitable planet");
      } else {
        toast.error("It is not a habitable planet");
      }
    } catch (error) {
      toast.error("Error posting data:", error);
    }
  };

  return (
    <div className="bg-[#f5f8fb]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center py-[30px] md:py-[30px] gap-[20px]"
      >
        <div className="bg-white px-4 md:px-[20px] py-[40px] mt-[50px] w-3/4 shadow-lg">
          <div className="text-[28px] md:text-[40px] pb-[20px]">
            <span className={firaSans.className}>
              Habitable Planet Calculator:
            </span>
          </div>

          {/* Flex containers for layout */}
          <div className="flex flex-col md:flex-row gap-8 bg-[#0b660e] p-[30px]">
            {/* First Flex Box (2/3 width) */}
            <div className="w-full md:w-2/3 flex flex-col justify-between">
              {/* Upper part: Columns 1 and 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {/* Column 1 */}
                <div className="flex flex-col gap-4">
                  {[
                    { id: "R_star", label: "R_star" },
                    { id: "L_star", label: "L_star" },
                    { id: "T_eff", label: "T_eff" },
                    { id: "R_planet", label: "R_planet" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block mb-1 text-[13px] text-white"
                      >
                        {field.label}:
                      </label>
                      <input
                        id={field.id}
                        value={inputs[field.id]}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-3/4 focus:outline-none focus:border-black focus:bg-gray-100"
                        required
                      />
                    </div>
                  ))}
                </div>

                {/* Column 2 */}
                <div className="flex flex-col gap-4">
                  {[
                    { id: "M_planet", label: "M_planet" },
                    { id: "semi_major_axis", label: "Semi-Major Axis" },
                    { id: "eccentricity", label: "Eccentricity" },
                    { id: "es", label: "Angular Separation" },
                    { id: "distance", label: "Distance" },
                  ].map((field) => (
                    <div key={field.id}>
                      <label
                        htmlFor={field.id}
                        className="block mb-1 text-[13px] text-white"
                      >
                        {field.label}:
                      </label>
                      <input
                        id={field.id}
                        value={inputs[field.id]}
                        onChange={handleInputChange}
                        className="border rounded px-2 py-1 w-3/4 focus:outline-none focus:border-black focus:bg-gray-100"
                        required
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Lower part: Submit Button */}
              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-white text-[#0b660e] px-14 py-2 rounded-full w-full md:w-auto text-[20px] font-semibold"
                >
                  CALCULATE
                </button>
              </div>
            </div>

            {/* Second Flex Box (1/3 width) */}
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              {[
                { id: "inclination", label: "Inclination (Assumed)" },
                { id: "albedo", label: "Albedo (Assumed)" },
                { id: "D_telescope", label: "D_telescope (Instrument)" },
                { id: "wavelength", label: "Wavelength (Instrument)" },
                { id: "IWA", label: "IWA (Instrument)" },
                { id: "OWA", label: "OWA (Instrument)" },
                { id: "contrast_limit", label: "Contrast Limit (Instrument)" },
                { id: "snr0", label: "Signal to Noise Ratio" },
              ].map((field) => (
                <div key={field.id}>
                  <label
                    htmlFor={field.id}
                    className="block mb-1 text-[13px] text-white"
                  >
                    {field.label}:
                  </label>
                  <input
                    id={field.id}
                    value={inputs[field.id]}
                    onChange={handleInputChange}
                    className="px-2 py-2 font-medium text-[15px] w-full  focus:outline-none border-green-600 rounded-sm border shadow-sm bg-[#044509] text-white"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center text-center bg-white shadow-lg py-[100px] px-[30px]">
          {output.result == "1" || output.result == "2" ? (
            <div className="text-green-600 text-[18px] md:text-[20px]">
              <span className={firaSans.className}>
                Calculated Result: Planet is potentially habitable!
              </span>
            </div>
          ) : (
            <div className=" text-[18px] md:text-[20px]">
              <span className={firaSans.className}>
                Planet is not habitable.
              </span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Calculator;
