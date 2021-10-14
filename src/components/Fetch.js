// Takes in type of api call and value to search, returns JSON data
const Fetch = async (type, value) => {
    console.log(`https://xchain.io/api/${type}/${value}`)
    const res = await fetch(`https://xchain.io/api/${type}/${value}`)
    const json = await res.json()
    return json
}

export default Fetch