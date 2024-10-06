import csv
import json

if __name__ == "__main__":
    data = {}
    csvFilePath = "./table.csv"
    csvFilePath = "./table_clean"
    jsonFilePath = "./data.json"
    with open(csvFilePath, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
        for line in infile:
            if not line.strip().startswith('#'):
                outfile.write(line)
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for row in csvReader:
            print(row)
            if row and not row[0].startswith("#"):
                csvReader = csv.DictReader(csvf, fieldnames=row)
                break
        for rows in csvReader:
            key = rows['rowid']
            data[key] = rows
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))