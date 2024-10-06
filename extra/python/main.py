import math
import csv
import json

SOLAR_RADIUS = 6.957e8
EARTH_RADIUS = 6.371e6
AU_IN_METERS = 1.496e11
PARSEC_IN_METERS = 3.086e16
STEFAN_BOLTZMANN_CONSTANT = 5.670374419e-8

def calculate_habitable_zone(L_star):
    HZ_inner = 0.75 * math.sqrt(L_star)
    HZ_outer = 1.77 * math.sqrt(L_star)
    return HZ_inner, HZ_outer

def is_in_habitable_zone(a, HZ_inner, HZ_outer):
    return HZ_inner <= a <= HZ_outer

def calculate_equilibrium_temperature(T_eff, R_star, a, albedo):
    R_star_meters = R_star * SOLAR_RADIUS
    a_meters = a * AU_IN_METERS
    T_eq = T_eff * math.sqrt(R_star_meters / (2 * a_meters)) * (1 - albedo)**0.25
    return T_eq

def calculate_angular_separation(a, distance):
    theta = (a / distance) * 206265
    return theta

def calculate_contrast(R_planet, a, albedo):
    R_planet_meters = R_planet * EARTH_RADIUS
    a_meters = a * AU_IN_METERS
    contrast = (R_planet_meters / a_meters)**2 * albedo
    return contrast

def is_habitable_and_detectable(params):
    R_star = params['R_star']
    L_star = params['L_star']
    T_eff = params['T_eff']
    R_planet = params['R_planet']
    a = params['semi_major_axis']
    albedo = params['albedo']
    distance = params['distance']
    D_telescope = params['D_telescope']
    wavelength = params['wavelength']
    IWA = params['IWA']
    OWA = params['OWA']
    contrast_limit = params['contrast_limit']

    HZ_inner, HZ_outer = calculate_habitable_zone(L_star)
    in_habitable_zone = is_in_habitable_zone(a, HZ_inner, HZ_outer)
    suitable_size = 0.5 <= R_planet <= 2.0
    T_eq = calculate_equilibrium_temperature(T_eff, R_star, a, albedo)
    suitable_temperature = 200 <= T_eq <= 330
    theta = calculate_angular_separation(a, distance)
    within_iwa = IWA <= theta <= OWA
    contrast = calculate_contrast(R_planet, a, albedo)
    sufficient_contrast = contrast >= contrast_limit
    habitable = in_habitable_zone and suitable_size and suitable_temperature
    detectable = within_iwa and sufficient_contrast

    if habitable and detectable:
        return 1
    elif habitable:
        return 2
    else:
        return 3

if __name__ == "__main__":
    with open('./data.json', 'r') as file:
        data = json.load(file)
        maxNum = 5765
        resData = []
        resData1 = 0
        resData2 = 0
        for i in range(1, maxNum + 1):
            newData = data[str(i)]
            newDict =  {
            "Row_Id": newData["rowid"],
            "pl_name": newData["pl_name"],
            "hostname": newData["hostname"],
            "pl_letter": newData["pl_letter"],
            "hd_name": newData["hd_name"],
            "hip_name": newData["hip_name"],
            "tic_id": newData["tic_id"],
            "gaia_id": newData["gaia_id"],
            "Orbital Period": newData["pl_orbper"] + " Days",
            "Semi-Major Axis": newData["pl_orbsmax"] + " AU",
            "Planet Radius": newData["pl_rade"] + " Earth radii",
            "Planet Mass": newData["pl_bmasse"] + " Earth masses",
            "Planet Density": newData["pl_dens"] + " g/cm^3",
            "Equilibrium Temperature": newData["pl_eqt"] + " K",
            "Orbital Eccentricity": newData["pl_orbeccen"],
            "Star Name": newData["pl_name"],
            "Spectral Type": newData["st_spectype"],
            "Effective Temperature": newData["st_teff"] + " K",
            "Stellar Radius": newData["st_rad"] + " Solar radii",
            "Stellar Mass": newData["st_mass"] + " Solar masses",
            "Stellar Luminosity": newData["st_lum"] + " Solar luminosities",
            "Rotation Period": newData["st_rotp"] + " days",
            "Distance from Earth": newData["sy_dist"] + " parsecs",
            "Right Ascension": newData["ra"],
            "Declination": newData["dec"],
            "In Right Ascension": newData["sy_pmra"] + " mas/yr",
            "In Declination": newData["sy_pmdec"] + " mas/yr",
            'R_star': float(1 if newData['st_rad'] == "" else newData['st_rad']),
            'L_star': 10 ** float(1 if newData['st_lum'] == "" else newData['st_lum']),
            'T_eff': float(1 if newData['st_teff'] == "" else newData['st_teff']),
            'R_planet': float(1 if newData['pl_rade'] == "" else newData['pl_rade']),
            'M_planet': float(1 if newData['pl_bmasse'] == "" else newData['pl_bmasse']),
            'semi_major_axis': float(1 if newData['pl_orbsmax'] == "" else newData['pl_orbsmax']),
            'eccentricity': float(1 if newData['pl_orbeccen'] == "" else newData['pl_orbeccen']),
            'inclination': 90.0,  # Assumed value
            'albedo': 0.30,       # Assumed value
            'distance': float(1 if newData['sy_dist'] == "" else newData['sy_dist']),
            'D_telescope': 6.0,   # Instrument parameter
            'wavelength': 550e-9, # Instrument parameter
            'IWA': 0.050,         # Instrument parameter
            'OWA': 1.000,         # Instrument parameter
            'contrast_limit': 1e-10  # Instrument parameter
            }
            result = is_habitable_and_detectable(newDict)
            if result == 1:
                resData.append(newDict)
                resData1 += 1
                # print("Potentially habitable and characterizable with HWO.")
            elif result == 2:
                resData.append(newDict)
                resData2 += 1 
                # print("Potentially habitable but not characterizable with current HWO parameters.")
            elif result == 3:
                pass
                # print("Not habitable based on provided parameters.")
        # Serializing json
        json_object = json.dumps(resData, indent=4)
        print("\n\n\n")
        print(len(resData), "\n\n\n")
        print(resData1, "\n\n\n")
        print(resData2, "\n\n\n")
        # Writing to sample.json
        with open("./result.json", "w") as outfile:
            outfile.write(json_object)
