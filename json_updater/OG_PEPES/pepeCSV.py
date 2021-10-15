import csv
# Contains CSV IO functions

# Read CSV
def readCSV(address="../PEPEDB.csv"):
    results = []
    with open(address) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        for row in csv_reader:
            results.append(row)

    return results

# Save CSV
def writeCSV(list, file_name, address="../scrape_caches/"):
    with open(address + file_name + ".csv", mode='w') as dispenser_file:
        dispenser_writer = csv.writer(dispenser_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        for line in list:
            dispenser_writer.writerow(line)

def appendCSV(line, file_name, address="../scrape_caches/"):
    with open(address + file_name + ".csv", mode='a') as dispenser_file:
        dispenser_writer = csv.writer(dispenser_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

        dispenser_writer.writerow(line)