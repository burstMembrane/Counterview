import json
import requests
from pepeCSV import readCSV
from xcp_get import asset_info

# Checks if image exists at html source
def is_url_image(asset):
    image_formats = ("image/jpg", "image/png", "image/gif", "image/jpeg")
    print("https://digirare.com/storage/rare-pepe/" + asset)
    r = requests.head("https://digirare.com/storage/rare-pepe/" + asset)
    if r.headers["content-type"] in image_formats:
        return True
    return False

if __name__ == "__main__":
    pepeJSON = []

    first = True
    PEPEDB = readCSV("./PEPEDB.csv")
    for line in PEPEDB:
        if(first):
            print("Scanning")
            first = False
        else:
            print(line[0])

            # Make call to XCP server for json info
            pepe_info = asset_info(line[0])
            asset_url = "null"
            print(pepe_info)

            # Find image filetype at digirare
            # Iterates through each file type
            file_types = ["image/jpg", "image/png", "image/gif", "image/jpeg"]
            for type in file_types:
                
                # create extension to append when file is found
                extension = ""
                if(type == "image/jpg"):
                    extension = ".jpg"
                elif(type == "image/jpeg"):
                    extension = ".jpeg"
                elif(type == "image/gif"):
                    extension = ".gif"
                elif(type == "image/png"):
                    extension = ".png"
                print("trying: " + extension)

                asset_end = line[0] + extension

                if(is_url_image(asset_end)):
                    asset_url = "https://digirare.com/storage/rare-pepe/" + asset_end
                    print("Found")
                    break

            # Append img url
            try:
                pepe_info[0].update({
                    "src": asset_url
                })
            except:
                print("Asset json not found")

            # Append to pepeJSON DB
            try:
                pepeJSON.append(pepe_info[0])
                print(pepe_info[0])
                with open("og_pepe_test.json", "w") as file:
                    json.dump(pepeJSON, file)
            except:
                print("Asset json not found to append")

    # Write pepeJSON to file
    with open("og_pepe.json", "w") as file:
        json.dump(pepeJSON, file)
