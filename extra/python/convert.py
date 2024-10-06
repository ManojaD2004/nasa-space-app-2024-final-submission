if __name__ == "__main__":
    data = {}
    csvFilePath = "./table.csv"
    jsonFilePath = "./data.json"
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)
        for rows in csvReader:
            key = rows['rowid']
            data[key] = rows
    with open(jsonFilePath, 'w', encoding='utf-8') as jsonf:
        jsonf.write(json.dumps(data, indent=4))