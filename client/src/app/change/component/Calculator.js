"use client";
import React, { useState } from "react";
import { Fira_Sans } from "next/font/google";

const firaSans = Fira_Sans({ subsets: ["latin"], weight: "400" });

function Calculator({ backEndLink }) {
  const [outputLength, setOutputLength] = useState(null);
  const [inputs, setInputs] = useState({
    inclination: "90.0",
    albedo: "0.30",
    D_telescope: "6.0",
    snr0: "100",
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

    const payload = {
      inclination: parseFloat(inputs.inclination),
      albedo: parseFloat(inputs.albedo),
      D_telescope: parseFloat(inputs.D_telescope),
      wavelength: parseFloat(inputs.wavelength),
      IWA: parseFloat(inputs.IWA),
      OWA: parseFloat(inputs.OWA),
      contrast_limit: parseFloat(inputs.contrast_limit),
      snr0: parseFloat(inputs.snr0),
    };

    console.log(payload);
    const result = await fetch(`${backEndLink}/change-constant-values`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataResult = await result.json();
    setOutputLength(dataResult.count);
    if (window) {
      window.localStorage.setItem(
        "resultData",
        JSON.stringify(dataResult.data)
      );
      console.log("Successfully Stored In LocalStorage");
      setTimeout(() => {
        window.open(`/exo-planet-space-change`);
      }, 1000);
    } else {
      console.log("Not Stored In LocalStorage");
    }
  };

  return (
    <div className="bg-[#f5f8fb]">
      <form
        onSubmit={handleSubmit}
        className="flex items-center justify-center py-[50px] md:py-[30px] gap-[25px] "
      >
        <div className="bg-white px-4 md:px-[50px] py-[40px] mt-[50px] w-3/4 shadow-lg">
          <div className="text-[28px] md:text-[30px] font-medium  pb-[20px]">
            <span className={firaSans.className}>
              Change the instrument and assumed values
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-[100px]">
            {/* Left Column - First 4 fields */}
            <div className="flex flex-col gap-4">
              {[
                { id: "inclination", label: "Inclination (Assumed)" },
                { id: "albedo", label: "Albedo (Assumed)" },
                { id: "D_telescope", label: "D_telescope (Instrument)" },
                { id: "snr0", label: "Signal to Noise Ratio (Instrument)" },
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
                    required={field.id === "distance"} // Distance is required
                  />
                </div>
              ))}
            </div>

            {/* Right Column - Next 4 fields */}
            <div className="flex flex-col gap-4">
              {[
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

          <div className="flex justify-end mt-8">
            <button
              type="submit"
              className="bg-[#e96535] text-white px-4 py-2 rounded w-full md:w-auto"
            >
              {"Submit -->"}
            </button>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center text-center">
          {outputLength !== null ? (
            <div className="text-green-600 text-[18px] md:text-[20px]">
              <div className={firaSans.className}>
                Calculated Result: {outputLength} Planet is potentially
                habitable!
              </div>
            </div>
          ) : (
            <div className=" text-[18px] md:text-[20px] bg-white shadow-md py-[100px] px-[20px]">
              <div className={firaSans.className}>Submit your data</div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Calculator;
