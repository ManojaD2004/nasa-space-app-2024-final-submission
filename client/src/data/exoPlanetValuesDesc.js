const planetValuesDesc = [
  {
    title: "R_star",
    desc: `Stellar Radius (in solar radii) - NASA ExoPlanet Archive Field Name: "st_rad"`,
  },
  {
    title: "L_star",
    desc: `Luminosity (in solar luminosities) [Read as 10 ^ data.st_lum] - NASA ExoPlanet Archive Field Name: "st_lum"`,
  },
  {
    title: "T_eff",
    desc: `Effective Temperature (in Kelvin) - NASA ExoPlanet Archive Field Name: "st_teff"`,
  },
  {
    title: "R_planet",
    desc: `Planetary Radius (in Earth radii) - NASA ExoPlanet Archive Field Name: "pl_rade"`,
  },
  {
    title: "M_planet",
    desc: `Planetary Mass (in Earth masses) - NASA ExoPlanet Archive Field Name: "pl_bmasse"`,
  },
  {
    title: "Semi-Major Axis",
    desc: `Semi-Major Axis (in Astronomical Units, AU) - NASA ExoPlanet Archive Field Name: "pl_orbsmax"`,
  },
  {
    title: "Eccentricity",
    desc: `Orbital Eccentricity - NASA ExoPlanet Archive Field Name: "pl_orbeccen"`,
  },
  {
    title: "Angular Separation",
    desc: `Angular Separation (in Micro Arc Seconds) - NASA ExoPlanet Archive Field Name: "pl_angsep"`,
  },
  {
    title: "Distance",
    desc: `Distance to the Star System (in parsecs) - NASA ExoPlanet Archive Field Name: "sy_dist"`,
  },
];
const instrumentValuesDesc = [
  {
    title: "Inclination (Assumed)",
    desc: `Inclination - Orbital plane angle (degrees)`,
  },
  {
    title: "Albedo (Assumed)",
    desc: `Albedo - Planetary reflectivity (dimensionless)`,
  },
  {
    title: "D_telescope (Instrument)",
    desc: `D_telescope - Telescope diameter (meters)`,
  },
  {
    title: "Wavelength (Instrument)",
    desc: `Wavelength - Observing wavelength (meters)`,
  },
  {
    title: "IWA (Instrument)",
    desc: `IWA - Minimum resolvable angle (arcseconds)`,
  },
  {
    title: "OWA (Instrument)",
    desc: `OWA - Maximum resolvable angle (arcseconds)`,
  },
  {
    title: "Contrast Limit (Instrument)",
    desc: `Contrast Limit - Detection contrast threshold (dimensionless)`,
  },
  {
    title: "Signal to Noise Ratio",
    desc: `Signal to Noise Ratio - Baseline signal-to-noise ratio (dimensionless)`,
  },
];
export { planetValuesDesc, instrumentValuesDesc };