import fakeData from "../data/fakedata.json"

function FindSrc(assetName) {
    let src = "null"
    fakeData.forEach(function (fakePepe) {
        // If asset is in fakeData
        if((assetName) && (assetName === fakePepe["asset"])) {
            src = fakePepe["src"]
        }
    })

    return src
}

export default FindSrc