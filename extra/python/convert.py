import csv
import json

if __name__ == "__main__":
    data = {}
    csvFilePath = "./table.csv"
    cleanCsvFilePath = "./table_clean.csv"
    jsonFilePath = "./data.json"
    with open(csvFilePath, "r", encoding="utf-8") as infile, open(
        cleanCsvFilePath, "w", encoding="utf-8"
    ) as outfile:
        for line in infile:
            if not line.strip().startswith("#"):
                outfile.write(line)
    print(
        "The ./table.csv have been cleaned, gotten the comments removed. And saved in ./table_clean.csv\n"
    )
    with open(cleanCsvFilePath, encoding="utf-8") as csvf:
        csvReader = csv.DictReader(csvf)
        for rows in csvReader:
            key = rows["rowid"]
            data[key] = rows
    with open(jsonFilePath, "w", encoding="utf-8") as jsonf:
        jsonf.write(json.dumps(data, indent=4))
    print(
        "The ./table_clean.csv have been read, and has converted and stored the values in JSON format at ./data.json file.\n"
    )
    data = {}
    with open(jsonFilePath, "r") as jsonf:
        data = json.load(jsonf)
        maxNum = len(data)
        for i in range(1, maxNum + 1):
            newData = data[str(i)]
            data[newData["rowid"]] = {
                "rowid": newData["rowid"],
                "pl_name": newData["pl_name"],
                "hostname": newData["hostname"],
                "pl_letter": newData["pl_letter"],
                "pl_orbper": newData["pl_orbper"],
                "pl_dens": newData["pl_dens"],
                "pl_eqt": newData["pl_eqt"],
                "st_mass": newData["st_mass"],
                "st_rad": newData["st_rad"],
                "st_lum": newData["st_lum"],
                "st_teff": newData["st_teff"],
                "pl_rade": newData["pl_rade"],
                "pl_bmasse": newData["pl_bmasse"],
                "pl_orbsmax": newData["pl_orbsmax"],
                "pl_orbeccen": newData["pl_orbeccen"],
                "sy_dist": newData["sy_dist"],
                "pl_angsep": newData["pl_angsep"]
            }
    cleanJsonFilePath = "./data_clean.json"
    with open(cleanJsonFilePath, "w", encoding="utf-8") as jsonf:
        jsonf.write(json.dumps(data, indent=4))
    data = None
    print(
        "The ./data.json have been read, and we extract only the usefully values and stored it in ./data_clean.json.\n"
    )
    print(
        "Now you can run the ./main.py file. Disable the logging option by changing IS_LOGGING = False in the 5th line of the ./main.py code.\n"
    )
