import os
import json
from boto3 import client

# if __name__ == "__main__":

# os.system("aws s3 ls s3://fakeasf.club --recursive --human-readable | grep 'png\|jpg\|gif'")

results = []

conn = client('s3')  
for key in conn.list_objects(Bucket='fakeasf.club')['Contents']:
    # print(key['Key'])

    # If string begins with assets/ continue
    if("assets/" in key["Key"]):
        asset_slice = key["Key"][7:]
        # print(asset_slice)

        # Get asset name
        asset_name = (asset_slice.split("/")[0])
        # print(asset_name)

        # Get asset image URL
        asset_url = (asset_slice.split("/")[1])
        # print(asset_url)
        
        # Check if asset image url is actually for image_large
        if((asset_url == asset_name + ".jpg") or (asset_url == asset_name + ".jpeg") or(asset_url == asset_name + ".png") or (asset_url == asset_name + ".gif") or (asset_url == asset_name + ".mp4")):

            # Full https link
            asset_full_url = "https://s3.us-west-1.amazonaws.com/fakeasf.club/assets/" + asset_name + "/" + asset_url

            # Add asset name and url to results
            results.append({"asset": asset_name, "src": asset_full_url})
        
print(results)

# Write results to file
with open('fakedata.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, ensure_ascii=False, indent=4)