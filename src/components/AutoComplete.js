import { useState, useEffect } from "react";
import FakeData from "../data/fakedata.json";
import OGPepe from "../data/og_pepe.json";

import { Dropdown, FormControl, InputGroup, Badge } from "react-bootstrap";

export default function AutoComplete(props) {
  const [autoComplete, setAutoComplete] = useState([]);
  const [showComplete, setShowComplete] = useState(false);
  const [addresses, setAddresses] = useState([]);

  const { input, setInput, search } = props;

  //   get asset names
  const assets = [
    ...FakeData.map((obj) => {
      return { series: obj.series, asset: obj.asset };
    }),
    ...OGPepe.map((obj) => {
      return { series: obj.series, asset: obj.asset };
    }),
  ];

  const handleSearch = async (value) => {
    // If text input is not length of address then search for asset

    if (value.length < 33 && !parseInt(input[0])) {
      // setResult(Fetch("asset", searchValue))

      setShowComplete(false);
      setAutoComplete([]);
      search(input);
    }
    if (parseInt(input[0]) === 1 && input.length >= 25 && input.length <= 35) {
      setAddresses([...new Set([value, ...addresses])]);
      const JSONAddresses = JSON.stringify(addresses);

      localStorage.setItem("addresses", JSONAddresses);
      search(input);
      // Search an address
      // setResult(Fetch("address", searchValue))
    }
  };

  function handleInput(input) {
    setShowComplete(false);
    setAutoComplete([]);
    // check if it's an asset
    if (input.length > 0 && !parseInt(input[0])) {
      setAutoComplete(
        assets.filter((asset) => asset.asset.includes(input.toUpperCase()))
      );
      if (autoComplete.length > 0) setShowComplete(true);
    }
    // if it starts with 1, it's probably an address
    if (parseInt(input[0]) === 1 && addresses.length >= 1) {
      setShowComplete(true);
    }
    setInput(input);
  }

  //   get addresses from localstorage
  useEffect(() => {
    try {
      const lsAdresses = JSON.parse(localStorage.getItem("addresses"));

      if (lsAdresses !== null) setAddresses(lsAdresses);
    } catch (error) {
      console.log("couldn't parse addresses");
    }
  }, []);

  return (
    <InputGroup>
      {showComplete && (
        <Dropdown.Menu show as='div' className='w-100'>
          {autoComplete.map(
            (asset, i) =>
              i < 10 && (
                <Dropdown.Item
                  className='w-100'
                  id={asset.asset}
                  onClick={(e) => {
                    console.log(e.target.id);
                    handleSearch(e.target.id);
                    setInput(e.target.id);
                    setShowComplete(false);
                  }}
                  key={i}>
                  <span align='start'>{asset.asset}</span>
                  <Badge
                    bg='light'
                    variant='light'
                    style={{ float: "right", color: "#212121" }}
                    pill
                    className='ml-auto'>
                    {asset.series && asset.series}
                  </Badge>
                </Dropdown.Item>
              )
          )}
          {addresses.length >= 1 && (
            <Dropdown.Header>Address History</Dropdown.Header>
          )}
          {addresses.length >= 1 &&
            addresses.map(
              (address, i) =>
                i < 5 && (
                  <Dropdown.Item
                    className='text-truncate'
                    style={{ textOverflow: "ellipsis" }}
                    as='div'
                    onClick={(e) => {
                      console.log(e.target.innerText);
                      handleSearch(e.target.innerText);
                      setInput(e.target.innerText);
                      setShowComplete(false);
                    }}
                    variant='secondary'
                    key={i}>
                    {address}
                  </Dropdown.Item>
                )
            )}
        </Dropdown.Menu>
      )}
      <FormControl
        type='search'
        value={input}
        placeholder={"Search asset or address"}
        className='mr-2 search-field'
        aria-label='Search'
        onChange={(e) => {
          handleInput(e.target.value);
        }}
      />
    </InputGroup>
  );
}
