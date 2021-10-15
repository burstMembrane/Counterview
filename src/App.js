import "./App.css";
import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Gallery from "./components/Gallery";
import FindSrc from "./components/FindSrc";
import CreateCard from "./components/CreateCard";

// TODOD:
// a. Load only when scroll down
// 1. Make function that shows list of all fake pepes
// 2. Make search data pull from form submit
// 3. Enter submits search not reloads page

function App() {
  // Global variables
  const [wallet, setWallet] = useState([]);
  const [data, setData] = useState({});
  const [pepeFilter, setPepeFilter] = useState({
    original: false,
    fake: true,
  });

  // Allows writing of parent data from child
  function onDataChange(input) {
    setData(input);
  }

  // On data update begin populating gallery
  useEffect(() => {
    // Filter JSON data for single asset or wallet balance
    if (data["asset"]) {
      // Get asset details
      const assetName = data["asset"];
      const assetQty = data["supply"];
      let asset_src_series = FindSrc(assetName); // Checks against fake json and returns img src
      const assetSrc = asset_src_series[0];
      const series = asset_src_series[1];

      // Create asset card
      setWallet(
        <CreateCard
          key={1}
          series={series}
          asset={assetName}
          quantity={assetQty}
          src={assetSrc}
          type={"asset"}
        />
      );
    } else if (data["data"]) {
      // Populate wallet with assets
      if (data["data"].length > 0) {
        let cardList = [];
        let count = 0;
        const assetList = data["data"];

        assetList.forEach((asset) => {
          const assetName = asset["asset"];
          const assetQty = asset["quantity"];
          let asset_src_series = FindSrc(assetName); // Checks for src
          const assetSrc = asset_src_series[0];
          const series = asset_src_series[1];
          // If asset src is found append to list
          if (assetSrc !== "null") {
            // Check if asset matches filters
            if (
              (pepeFilter.original && series === "original") ||
              (pepeFilter.fake && series === "fake")
            ) {
              cardList.push(
                <CreateCard
                  key={count}
                  series={series}
                  asset={assetName}
                  quantity={assetQty}
                  src={assetSrc}
                  pepeFilter={pepeFilter}
                />
              );
              // Continue index count
              count += 1;
            }
          }
        });

        // Update wallet
        setWallet(cardList);
      }
    }
  }, [data, pepeFilter]);

  // FILTER FUNCS
  function onFilterChange(type) {
    // If input is original filter toggles allow OG pepes
    if (type === "original") {
      setPepeFilter((prevState) => ({
        original: !prevState.original,
        fake: prevState.fake,
      }));
    } else if (type === "fake") {
      // If input is fake filter toggles allow OG pepes
      setPepeFilter((prevState) => ({
        original: prevState.original,
        fake: !prevState.fake,
      }));
    }
  }

  return (
    <div>
      <NavBar
        data={data}
        onDataChange={onDataChange}
        pepeFilter={pepeFilter}
        onFilterChange={onFilterChange}
      />
      <Gallery wallet={wallet} pepeFilter={pepeFilter} />
    </div>
  );
}

export default App;
