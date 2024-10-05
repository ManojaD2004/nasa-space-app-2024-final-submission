import math
import csv
import json
import random

IS_LOGGING = True
SOLAR_RADIUS = 6.957e8
EARTH_RADIUS = 6.371e6
AU_IN_METERS = 1.496e11
PARSEC_IN_METERS = 3.086e16
STEFAN_BOLTZMANN_CONSTANT = 5.670374419e-8
TEXTURE_PACK = [
  { "textureLoc": "planet1", "varietyNums": 4 },
  { "textureLoc": "planet2", "varietyNums": 2 },
  { "textureLoc": "planet3", "varietyNums": 4 },
  { "textureLoc": "planet4", "varietyNums": 3 },
  { "textureLoc": "planet5", "varietyNums": 3 },
]


def calculate_habitable_zone(L_star):
    HZ_inner = 0.75 * math.sqrt(L_star)
    HZ_outer = 1.77 * math.sqrt(L_star)
    return HZ_inner, HZ_outer


def is_in_habitable_zone_with_eccentricity(a, eccentricity, HZ_inner, HZ_outer):

    perihelion = a * (1 - eccentricity)
    aphelion = a * (1 + eccentricity)

    return (HZ_inner <= perihelion <= HZ_outer) or (HZ_inner <= aphelion <= HZ_outer)


def is_in_habitable_zone(a, HZ_inner, HZ_outer):
    return HZ_inner <= a <= HZ_outer


def calculate_equilibrium_temperature(T_eff, R_star, a, albedo):
    R_star_meters = R_star * SOLAR_RADIUS
    a_meters = a * AU_IN_METERS
    T_eq = T_eff * math.sqrt(R_star_meters / (2 * a_meters)) * (1 - albedo) ** 0.25
    return T_eq


def calculate_angular_separation(a, distance):
    theta = (a / distance) * 206265
    return theta


def calculate_contrast(R_planet, a, albedo):
    R_planet_meters = R_planet * EARTH_RADIUS
    a_meters = a * AU_IN_METERS
    contrast = (R_planet_meters / a_meters) ** 2 * albedo
    return contrast

def wavelength_effect(wavelength):
    return 1 / wavelength  

def calculate_snr(snr0, R_star, R_planet, D_telescope, ps, wavelength, es):
    if es==0:
        return 0
    snr = snr0 * ((R_star * R_planet * (D_telescope / 6)) / (((es/1000) / 10) * ps)) ** 2 * (wavelength_effect(wavelength))
    return snr

def calculate_esmax(D_telescope, ps, wavelength):

    esmax = 15 * (D_telescope / 6) / ps * (wavelength_effect(wavelength))
    return esmax

def is_habitable_and_detectable(params):
    R_star = params["R_star"]
    L_star = params["L_star"]
    T_eff = params["T_eff"]
    R_planet = params["R_planet"]
    a = params["semi_major_axis"]
    albedo = params["albedo"]
    distance = params["distance"]
    D_telescope = params["D_telescope"]
    wavelength = params["wavelength"]
    IWA = params["IWA"]
    OWA = params["OWA"]
    contrast_limit = params["contrast_limit"]
    snr0 = params["snr0"]
    ps = params["semi_major_axis"]
    eccentricity = params["eccentricity"]
    es=params["es"]

    HZ_inner, HZ_outer = calculate_habitable_zone(L_star)
    if eccentricity > 0:
        in_habitable_zone = is_in_habitable_zone_with_eccentricity(
            a, eccentricity, HZ_inner, HZ_outer
        )
    else:
        in_habitable_zone = is_in_habitable_zone(a, HZ_inner, HZ_outer)

    suitable_size = 0.5 <= R_planet <= 2.0
    T_eq = calculate_equilibrium_temperature(T_eff, R_star, a, albedo)
    suitable_temperature = 200 <= T_eq <= 330
    theta = calculate_angular_separation(a, distance)
    within_iwa = IWA <= theta <= OWA
    contrast = calculate_contrast(R_planet, a, albedo)
    sufficient_contrast = contrast >= contrast_limit
    snr = calculate_snr(snr0, R_star, R_planet, D_telescope, ps, wavelength, es)
    detectable_snr = snr > 5
    esmax = calculate_esmax(D_telescope, ps, wavelength)
    esmax = calculate_esmax(D_telescope, ps, wavelength)
    resolvable = distance <= esmax
    habitable = in_habitable_zone and suitable_size and suitable_temperature
    detectable = within_iwa and sufficient_contrast and detectable_snr and resolvable

    if habitable and detectable:
        return 1
    elif habitable:
        return 2
    else:
        return 3


if __name__ == "__main__":
    jsonDataLoc = "./data_clean.json"
    resData = []
    maxNum = None
    logFileData = ""
    with open(jsonDataLoc, "r") as file:
        data = json.load(file)
        maxNum = len(data)
        for i in range(1, maxNum + 1):
            newData = data[str(i)]
            newDict = {
                "Row_Id": newData["rowid"],
                "pl_name": newData["pl_name"],
                "hostname": newData["hostname"],
                "Orbital Period": (
                    "365"
                    if newData["pl_orbper"] == ""
                    else newData["pl_orbper"] + " Days"
                ),
                "Semi-Major Axis": (
                    "1"
                    if newData["pl_orbsmax"] == ""
                    else newData["pl_orbsmax"] + " AU"
                ),
                "Planet Radius": (
                    "1"
                    if newData["pl_rade"] == ""
                    else newData["pl_rade"] + " Earth radii"
                ),
                "Planet Mass": (
                    "1"
                    if newData["pl_bmasse"] == ""
                    else newData["pl_bmasse"] + " Earth masses"
                ),
                "Planet Density": (
                    "1" if newData["pl_dens"] == "" else newData["pl_dens"] + " g/cm^3"
                ),
                "Equilibrium Temperature": (
                    "274" if newData["pl_eqt"] == "" else newData["pl_eqt"] + " K"
                ),
                "Orbital Eccentricity": (
                    1 if newData["pl_orbeccen"] == "" else newData["pl_orbeccen"]
                ),
                "Star Name": newData["pl_name"],
                "Effective Temperature": (
                    "274" if newData["st_teff"] == "" else newData["st_teff"] + " K"
                ),
                "Stellar Radius": (
                    "1"
                    if newData["st_rad"] == ""
                    else newData["st_rad"] + " Solar radii"
                ),
                "Stellar Mass": (
                    "1"
                    if newData["st_mass"] == ""
                    else newData["st_mass"] + " Solar masses"
                ),
                "Distance from Earth": (
                    "1" if newData["sy_dist"] == "" else newData["sy_dist"] + " parsecs"
                ),
                "R_star": float(0.1 if newData["st_rad"] == "" else newData["st_rad"]),
                "L_star": 10
                ** float(-1 if newData["st_lum"] == "" else newData["st_lum"]),
                "T_eff": float(3000 if newData["st_teff"] == "" else newData["st_teff"]),
                "R_planet": float(
                    1 if newData["pl_rade"] == "" else newData["pl_rade"]
                ),
                "M_planet": float(
                    1 if newData["pl_bmasse"] == "" else newData["pl_bmasse"]
                ),
                "semi_major_axis": float(
                    1 if newData["pl_orbsmax"] == "" else newData["pl_orbsmax"]
                ),
                "es": float(
                    0 if newData["pl_angsep"] == "" else newData["pl_angsep"]
                ),
                "eccentricity": float(
                    0 if newData["pl_orbeccen"] == "" else newData["pl_orbeccen"]
                ),
                "distance": float(
                    10 if newData["sy_dist"] == "" else newData["sy_dist"]
                ),
                # Convert Default Values to Macros
                "inclination": 90.0,  # Assumed value
                "albedo": 0.30,  # Assumed value
                "D_telescope": 6.0,  # Instrument parameter
                "wavelength": 550e-9,  # Instrument parameter
                "IWA": 0.050,  # Instrument parameter
                "OWA": 1.000,  # Instrument parameter
                "contrast_limit": 1e-10,  # Instrument parameter
                "snr0": 100,
            }
            result = is_habitable_and_detectable(newDict)
            if result == 1:
                # Texture Generator
                textureChoice = random.choice(TEXTURE_PACK)
                newDict["plaTexture"] = textureChoice["textureLoc"]
                newDict["varietyNum"] = random.randint(1, textureChoice["varietyNums"])
                resData.append(newDict)
                if IS_LOGGING == True:
                    logStr = (
                        str(i)
                        + ". "
                        + newData["pl_name"]
                        + " Is Potentially habitable and Characterizable with HWO.\n"
                    )
                    logFileData = logFileData + logStr
                    print(logStr, end="")
            elif result == 2:
                textureChoice = random.choice(TEXTURE_PACK)
                newDict["plaTexture"] = textureChoice["textureLoc"]
                newDict["varietyNum"] = random.randint(1, textureChoice["varietyNums"])
                resData.append(newDict)
                if IS_LOGGING == True:
                    logStr = (
                        str(i)
                        + ". "
                        + newData["pl_name"]
                        + " Is Potentially habitable but not characterizable with current HWO parameters.\n"
                    )
                    logFileData = logFileData + logStr
                    print(logStr, end="")
            elif result == 3:
                if IS_LOGGING == True:
                    logStr = (
                        str(i)
                        + ". "
                        + newData["pl_name"]
                        + " Is Not habitable based on provided parameters.\n"
                    )
                    logFileData = logFileData + logStr
                    print(logStr, end="")
    resJsonLoc = "./result.json"
    json_object = json.dumps(resData, indent=4)
    with open(resJsonLoc, "w") as outfile:
        outfile.write(json_object)
    json_object = None
    logFileLoc = "./result_log.txt"
    if IS_LOGGING == True:
        with open(logFileLoc, "w") as outfile:
            outfile.write(logFileData)
        logFileData = None
        print("\nAll the results are stored in ./result_log.txt")
    print(
        "\nThe Total Number of Habitable Planets is:",
        len(resData),
        "of the",
        maxNum,
        "Available Exo Planets Given By NASA Archive Data API",
        "\n",
    )
    resData = None
