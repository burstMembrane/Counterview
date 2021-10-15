import xcp_get

if __name__ == "__main__":
    # My wallet address
    pubkey = "1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5"

    # Get wallet contents
    wallet_data = xcp_get.address(pubkey)

    # Create wallet asset list
    wallet = []

    for asset in wallet_data:
        # Check for dispenser
        disp_result = xcp_get.dispenser(asset["asset"])

        if len(disp_result) > 0:
            print(disp_result)