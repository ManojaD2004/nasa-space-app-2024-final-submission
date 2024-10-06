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

    // Prepare payload with correct types
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
      const linkApi = "https://hep.machalang.com";
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
      setOutput(output1.data);

      if (output1.result === "1" || output1.result === "2") {
        toast.success("It is a habitable planet");
      } else {
        toast.error("It is not a habitable planet");
      }
    } catch (error) {
      toast.error("Error posting data:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="bg-white px-4 md:px-[50px] py-[40px] w-full ">
        <div className="text-[28px] md:text-[40px] font-bold pb-[20px] text-center">
          Habitable Planet Calculator:
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[100px]">
          {/* Left Column */}
          <div className="flex flex-col gap-4">
            {[
              { id: "R_star", label: "R_star" },
              { id: "L_star", label: "L_star" },
              { id: "T_eff", label: "T_eff" },
              { id: "R_planet", label: "R_planet" },
              { id: "M_planet", label: "M_planet" },
              { id: "semi_major_axis", label: "Semi-Major Axis" },
              { id: "eccentricity", label: "Eccentricity" },
              { id: "distance", label: "Distance" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block mb-1 text-[13px]">
                  {field.label}:
                </label>
                <input
                  id={field.id}
                  value={inputs[field.id]}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full focus:outline-none focus:border-black focus:bg-gray-100"
                  required
                />
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {[
              { id: "inclination", label: "Inclination (Assumed)" },
              { id: "albedo", label: "Albedo (Assumed)" },
              { id: "D_telescope", label: "D_telescope (Instrument)" },
              { id: "wavelength", label: "Wavelength (Instrument)" },
              { id: "IWA", label: "IWA (Instrument)" },
              { id: "OWA", label: "OWA (Instrument)" },
              { id: "contrast_limit", label: "Contrast Limit (Instrument)" },
            ].map((field) => (
              <div key={field.id}>
                <label htmlFor={field.id} className="block mb-1 text-[13px]">
                  {field.label}:
                </label>
                <input
                  id={field.id}
                  value={inputs[field.id]}
                  onChange={handleInputChange}
                  className="border rounded px-2 py-1 w-full focus:outline-none focus:border-black focus:bg-gray-100"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto"
          >
            Submit
          </button>
        </div>
      </div>

      {/* Output Display */}
      <div className="mt-4 flex items-center justify-center text-center">
        {output.result === "1" || output.result === "2" ? (
          <div className="text-green-600 text-[18px] md:text-[20px]">
            Calculated Result: Planet is potentially habitable!
          </div>
        ) : (
          <div className="text-red-600 text-[18px] md:text-[20px]">
            Planet is not habitable.
          </div>
        )}
      </div>
    </form>
  );
}

export default Calculator;
