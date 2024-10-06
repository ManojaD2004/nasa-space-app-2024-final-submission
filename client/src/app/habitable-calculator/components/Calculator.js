"use client";
import React, { useState } from "react";
import toast from "react-hot-toast";

function Calculator() {
  const [output, setOutput] = useState(0);
  const [inputs, setInputs] = useState({
    R_star: "",
    L_star: "",
    T_eff: "",
    R_planet: "",
    M_planet: "",
    semi_major_axis: "",
    eccentricity: "",
    inclination: "90.0",
    albedo: "0.30",
    distance: "",
    D_telescope: "6.0",
    wavelength: "550e-9",
    IWA: "0.050",
    OWA: "1.000",
    contrast_limit: "1e-10",
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
    // Convert inputs to the correct types (number)
    const payload = {
      R_star: parseFloat(inputs.R_star),
      L_star: parseFloat(inputs.L_star),
      T_eff: parseInt(inputs.T_eff, 10),
      R_planet: parseFloat(inputs.R_planet),
      M_planet: parseFloat(inputs.M_planet),
      semi_major_axis: parseFloat(inputs.semi_major_axis),
      eccentricity: parseFloat(inputs.eccentricity),
      inclination: parseFloat(inputs.inclination),
      albedo: parseFloat(inputs.albedo),
      distance: parseFloat(inputs.distance),
      D_telescope: parseFloat(inputs.D_telescope),
      wavelength: parseFloat(inputs.wavelength),
      IWA: parseFloat(inputs.IWA),
      OWA: parseFloat(inputs.OWA),
      contrast_limit: parseFloat(inputs.contrast_limit),
    };

    try {
      const linkApi =
        "https://ec2-13-202-20-192.ap-south-1.compute.amazonaws.com";
      const response = await fetch(
        `${linkApi}/habitable-exoplanet-calculator`,
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
      console.log("Posted data:", output1.data);
      if (output1.created == true) {
        toast.success("Data posted successfully!");
      }
      setOutput(output1.data);
      if (output.result === '1') {
        toast.success("It is a habitable planet");
      } else if (output.result === '2') {
        toast.success("It is a habitable planet");
      } else {
        toast.success("It is not a habitable planet");
      }
      
    } catch (error) {
      toast.error("Error posting data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white px-[50px] py-[70px] w-full ">
        <div className="text-[40px] font-bold pb-[30px]">
          Habitable Planet Calculator:
        </div>
        <div className="flex items-center justify-center gap-[300px]">
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="R_star" className="block mb-1 text-[13px]">
                R_star:
              </label>
              <input
                id="R_star"
                placeholder=""
                value={inputs.R_star}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="L_star" className="block mb-1 text-[13px]">
                L_star:
              </label>
              <input
                id="L_star"
                placeholder=""
                value={inputs.L_star}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="T_eff" className="block mb-1 text-[13px]">
                T_eff:
              </label>
              <input
                id="T_eff"
                placeholder=""
                value={inputs.T_eff}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="R_planet" className="block mb-1 text-[13px]">
                R_planet:
              </label>
              <input
                id="R_planet"
                placeholder=""
                value={inputs.R_planet}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="M_planet" className="block mb-1 text-[13px]">
                M_planet:
              </label>
              <input
                id="M_planet"
                placeholder=""
                value={inputs.M_planet}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="semi_major_axis"
                className="block mb-1 text-[13px]"
              >
                semi_major_axis:
              </label>
              <input
                id="semi_major_axis"
                placeholder=""
                value={inputs.semi_major_axis}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="eccentricity" className="block mb-1 text-[13px]">
                eccentricity:
              </label>
              <input
                id="eccentricity"
                placeholder=""
                value={inputs.eccentricity}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="distance" className="block mb-1 text-[13px]">
                distance:
              </label>
              <input
                id="distance"
                placeholder=""
                value={inputs.distance}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="inclination" className="block mb-1 text-[13px]">
                {"inclination (Assumed value):"}
              </label>
              <input
                id="inclination"
                placeholder=""
                value={inputs.inclination}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="albedo" className="block mb-1 text-[13px]">
                {"albedo: (Assumed value)"}
              </label>
              <input
                id="albedo"
                placeholder=""
                value={inputs.albedo}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>

            <div>
              <label htmlFor="D_telescope" className="block mb-1 text-[13px]">
                {"D_telescope: (Instrument parameter)"}
              </label>
              <input
                id="D_telescope"
                placeholder=""
                value={inputs.D_telescope}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="wavelength" className="block mb-1 text-[13px]">
                {"wavelength: (Instrument parameter)"}
              </label>
              <input
                id="wavelength"
                placeholder=""
                value={inputs.wavelength}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="IWA" className="block mb-1 text-[13px]">
                {"IWA: (Instrument parameter)"}
              </label>
              <input
                id="IWA"
                placeholder=""
                value={inputs.IWA}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="OWA" className="block mb-1 text-[13px]">
                {"OWA: (Instrument parameter)"}
              </label>
              <input
                id="OWA"
                placeholder=""
                value={inputs.OWA}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="contrast_limit"
                className="block mb-1 text-[13px]"
              >
                {"contrast_limit:: (Instrument parameter)"}
              </label>
              <input
                id="contrast_limit"
                placeholder=""
                value={inputs.contrast_limit}
                onChange={handleInputChange}
                className="border rounded px-2 py-1 w-[400px] focus:outline-none focus:border-black focus:bg-gray-100"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </div>
      <div className="mt-4 flex p-[50px] items-center justify-center">
        {output.result == 1 || output.result == 2 ? (
          <div className="text-green-600 text-[20px]">
           
            Calculated Result: Planet is potenitially habitable !!
          </div>
        ) : (
          <div className="text-red-600">Planet is not Habitable</div>
        )}
      </div>
    </form>
  );
}

export default Calculator;
