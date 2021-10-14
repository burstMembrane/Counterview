import './App.css'
import React, { useEffect, useState } from "react"
import NavBar from "./components/NavBar"
import Gallery from "./components/Gallery"
import FindSrc from "./components/FindSrc"
import CreateCard from './components/CreateCard'

// TODOD:
// 1. Make function that shows list of all fake pepes
// 2. Make search data pull from form submit
// 3. Enter submits search not relaods page

function App() {
    // Global variables
    const [ wallet, setWallet ] = useState([])
    const [ data, setData ] = useState({})
    const [ searchType, setSearchType ] = useState("")

    // Allows writing of parent data from child
    function onDataChange(input) {setData(input)}
    function onSearchTypeChange(input) {setSearchType(input)}

    // On data update begin populating gallery
    useEffect(() => {
        // Filter JSON data for single asset or wallet balance
        if(data["asset"]) {

            // Get asset details
            const assetName = data["asset"]
            const assetQty = data["supply"]
            let assetSrc = FindSrc(assetName)

            // Create asset card
            // setWallet({"asset": assetName, "quantity": assetQty, "src": assetSrc})
            setWallet(<CreateCard key={1} asset={assetName} quantity={assetQty} src={assetSrc} type={"asset"} />)

        } else if (data["data"]) {

            // Populate wallet with assets
            if (data["data"].length > 0) {

                console.log("Parsing data")
                let cardList = []
                let count = 0
                const assetList = data["data"]
                
                assetList.forEach((asset) => {
                    const assetName = asset["asset"]
                    const assetQty = asset["quantity"]
                    let assetSrc = FindSrc(assetName)
                    // If asset src is found append to list
                    if(assetSrc != "null") {
                            cardList.push(
                                <CreateCard key={count} asset={assetName} quantity={assetQty} src={assetSrc} type={"address"} />
                            )
                            // Continue index count
                            count += 1
                        }
                })
                
                // Update wallet
                setWallet(cardList)
            }
            
        }
    }, [data])

    // When wallet state is updated
    useEffect(() => {
        
    }, [wallet])

    return (
        <div>
            <NavBar 
                data={data} 
                onDataChange={onDataChange}
                onSearchTypeChange={onSearchTypeChange}
            />
            <Gallery 
                wallet={wallet}
            />
        </div>
    );
}

export default App;
