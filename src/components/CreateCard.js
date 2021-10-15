import React, { useState, useEffect } from "react"
import Fetch from "./Fetch"

// Takes in image src, asset name and 
// quantity to return an image card for gallery view
// TODO: Create alternative display for MP4
function CreateCard(props) {
    const [ toggle, setToggle ] = useState({
        info: false
    })
    const [ info, setInfo ] = useState({
        supply: 0,
        est_value: "$0",
        dispenser_price: "0 BTC"
    })
    const [ callInfo , setCallInfo ] = useState(false)

    // Creates class names for card
    const className = `image-card ${props.series}`

    // Sets state for info toggle
    function changeToggle() {
        setToggle(prevState => ({
            info: !prevState.info
        }))
    }

    // Runs on call info so not to continuously call
    useEffect(() => {
        // Updates asset and market info on toggle
        const updateData = async () => {
            // Update info
            const asset_info = await Fetch("asset", props.asset)
            let val_usd = "Priceless"
            if(asset_info["estimated_value"]["usd"] > 0.0) {
                val_usd = parseFloat(asset_info["estimated_value"]["usd"]).toFixed(4)
            }

            // Update dispenser
            const asset_disp = await Fetch("dispensers", props.asset)
            let dispenser_btc = ""
            if(asset_disp["data"].length > 0) {
                dispenser_btc = ((parseFloat(asset_disp["data"][0]["satoshirate"]).toFixed(4)).toString() + "BTC")
            } else {
                dispenser_btc = "Priceless"
            }

            setInfo(prevState => ({
                supply: asset_info["supply"],
                est_value: val_usd.toString(),
                dispenser_price: dispenser_btc.toString()
            }))
        }
        updateData()
    }, [callInfo])

    useState(() => {
        // console.log(info)
    }, [info])


    // Info component
    const cardInfo = (
        <span
            className="card-info"
        >
            <span className="fill"></span>
            <p>INFO</p>
            <p><a href={`https://xchain.io/asset/${props.asset}`} target="_blank">XCHAIN</a></p>
            <p>SUPPLY: {info.supply}</p>
            <p>EST VAL: {info.est_value}</p>
            <p>LAST DISP: {info.dispenser_price}</p>
        </span>
    )

    return (
        <span 
            className={className}
            onClick={() => {
                
            }}
        >
            {toggle.info ? cardInfo : null}
            <img 
                alt={props.asset}
                src={props.src}
            />
            <p 
                className="asset-info"
                onClick={() => {
                    changeToggle()
                }}
            >
                <span>{props.asset}</span>
                <span>{props.quantity}</span>
            </p>
        </span>
    )
}

export default CreateCard