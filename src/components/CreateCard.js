import React from "react"

function CreateCard(props) {
    // Takes in image src, asset name and 
    // quantity to return an image card for gallery view
    
    // TODO: Create alternative display for MP4

    return (
        <span 
            className="image-card"
        >
            <img 
                src={props.src}
            />
            <p>
                Asset: {props.asset}
            </p>
            <p>
                {props.type == "asset" ? "Supply: " : "QTY owned: "}{props.quantity}
            </p>
        </span>
    )
}

export default CreateCard