# Module for XCP gets
import json
import requests
from requests.auth import HTTPBasicAuth

# RPC 2.0 Headers
url = "http://public.coindaddy.io:4000/api/"
headers = {'content-type': 'application/json'}
auth = HTTPBasicAuth('rpc', "1234")

# Requests asset info
def asset_info(asset):
    payload = {
        "method": "get_asset_info",
        "params": {
            # "filter": "asset_name", "op": "==", "value": asset
            # "asset": asset
            "assets": [asset]
        },
        "jsonrpc": "2.0",
        "id": 0
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers, auth=auth)
    data = response.json()
    return data["result"]


# Requests information on dispensers for a given asset
def address(address):
    payload = {
        "method": "get_balances",
        "params": {
            "filters": 
                [
                    {"field": "address", "op": "==", "value": address},
                    {"field": "quantity", "op": ">", "value": "0"}
                ],
            "filterop": "AND"
        },
        "jsonrpc": "2.0",
        "id": 0
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers, auth=auth)
    data = response.json()
    return data["result"]

# Requests information on dispensers for a given asset
def dispenser(asset):
    payload = {
        "method": "get_dispensers",
        "params": {
            "filters": 
                [
                    {"field": "asset", "op": "==", "value": asset},
                    {"field": "status", "op": "==", "value": "0"},
                    {"field": "give_remaining", "op": ">", "value": "0"}
                ],
            "filterop": "AND"
        },
        "jsonrpc": "2.0",
        "id": 0
    }
    response = requests.post(url, data=json.dumps(payload), headers=headers, auth=auth)
    data = response.json()
    return data["result"]