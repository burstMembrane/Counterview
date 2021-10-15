import fakeData from "../data/fakedata.json"
import ogData from "../data/og_pepe.json"

// Gets asset data for all wallet contents
function FindSrc(assetName) {
    let src = "null"
    let series = ""
    // If asset is in fakeData
    fakeData.forEach(function (fakePepe) {
        if((assetName) && (assetName === fakePepe["asset"])) {
            series = fakePepe["series"]
            src = fakePepe["src"]
            return false
        }
    })
    // If asset is in og data
    ogData.forEach(function (ogPepe) {
        if((assetName) && (assetName === ogPepe["asset"])) {
            series = "original"
            src = ogPepe["src"]
            return false
        }
    })

    return [src, series]
}

export default FindSrc