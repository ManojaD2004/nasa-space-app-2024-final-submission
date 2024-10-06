import math
import json
import sys

SOLAR_RADIUS = 6.957e8
EARTH_RADIUS = 6.371e6
AU_IN_METERS = 1.496e11
PARSEC_IN_METERS = 3.086e16
STEFAN_BOLTZMANN_CONSTANT = 5.670374419e-8

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
    if es == 0:
        return 0
    snr = (
        snr0
        * ((R_star * R_planet * (D_telescope / 6)) / (((es / 1000) / 10) * ps)) ** 2
        * (wavelength_effect(wavelength))
    )
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
    es = params["es"]

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
    newData = json.loads(sys.argv[1])
    newDict = {
        "R_star": float(0.1 if newData["R_star"] == "" else newData["R_star"]),
        "L_star": float(-1 if newData["L_star"] == "" else newData["L_star"]),
        "T_eff": float(3000 if newData["T_eff"] == "" else newData["T_eff"]),
        "R_planet": float(1 if newData["R_planet"] == "" else newData["R_planet"]),
        "M_planet": float(1 if newData["M_planet"] == "" else newData["M_planet"]),
        "semi_major_axis": float(
            1 if newData["semi_major_axis"] == "" else newData["semi_major_axis"]
        ),
        "es": float(0 if newData["es"] == "" else newData["es"]),
        "eccentricity": float(
            0 if newData["eccentricity"] == "" else newData["eccentricity"]
        ),
        "distance": float(10 if newData["distance"] == "" else newData["distance"]),
        # Convert Default Values to Macros
        "inclination": newData["inclination"],  # Assumed value
        "albedo": newData["albedo"],  # Assumed value
        "D_telescope": newData["D_telescope"],  # Instrument parameter
        "wavelength": newData["wavelength"],  # Instrument parameter
        "IWA": newData["IWA"],  # Instrument parameter
        "OWA": newData["OWA"],  # Instrument parameter
        "contrast_limit": newData["contrast_limit"],  # Instrument parameter
        "snr0": newData["snr0"],
    }
    result = is_habitable_and_detectable(newDict)
    print(result)
