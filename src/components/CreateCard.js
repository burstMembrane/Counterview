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
            <p className="asset-name">
                <span>{props.asset}</span>
                <span>{props.quantity}</span>
            </p>
        </span>
    )
}

export default CreateCard