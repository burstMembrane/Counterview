import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  Dropdown,
  Form,
  FormControl,
  Button,
  InputGroup,
  Image,
} from "react-bootstrap";
import Fetch from "./Fetch";

import FakeData from "../data/fakedata.json";

function NavBar(props) {
  const [input, setInput] = useState(""); // Search input box value
  const [result, setResult] = useState(""); // Fetch results
  const [searchType, setSearchType] = useState("");

  const [autoComplete, setAutoComplete] = useState([]);
  const [showComplete, setShowComplete] = useState(true);
  const [addresses, setAddresses] = useState([]);

  //   get asset names
  const assets = FakeData.map((obj) => obj.asset);

  //   get address history from localstorage
  useEffect(() => {
    try {
      const lsAdresses = JSON.parse(localStorage.getItem("addresses"));

      if (lsAdresses !== null) setAddresses(lsAdresses);
      console.log(addresses);
    } catch (error) {
      console.log("couldn't parse addresses");
    }
  }, []);
  // 1. Handles search input
  function handleInput(input) {
    // autocomplete from json

    // set the autocomplete to false
    setShowComplete(false);
    setAutoComplete([]);
    // check if it's an asset
    if (input.length > 0 && !parseInt(input[0])) {
      assets.forEach((asset) => {
        setAutoComplete(
          assets.filter((asset) => asset.includes(input.toUpperCase()))
        );
        setShowComplete(true);
      });
    }
    // if it starts with 1, it's probably an address
    if (parseInt(input[0]) === 1) {
      setShowComplete(true);
    }

    setInput(input);
  }

  function handleSubmit(e) {
    search(input);
    e.preventDefault();
  }

  // 2. Receives search input and filters length to determine if asset or address then fetches API data
  const search = async (value) => {
    // If text input is not length of address then search for asset
    if (value.length < 33 && !parseInt(input[0])) {
      // setResult(Fetch("asset", searchValue))
      const res = await Fetch("asset", value);
      console.log(res);
      if (res.error) {
        console.error(res.error);
        return;
      }
      setResult(res);
      setSearchType("asset");
      setInput(res.asset);
      setShowComplete(false);
      setAutoComplete([]);
    }
    if (parseInt(input[0]) === 1 && input.length >= 25 && input.length <= 35) {
      setAddresses([...new Set([value, ...addresses])]);
      const JSONAddresses = JSON.stringify(addresses);

      localStorage.setItem("addresses", JSONAddresses);

      // Search an address
      // setResult(Fetch("address", searchValue))
      try {
        const res = await Fetch("balances", value);
        setResult(res);
        setSearchType("address");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // 3. Updates wallet values when async is complete
  useEffect(() => {
    // Passes JSON data to parent
    props.onDataChange(result);
  }, [result]);

  useEffect(() => {
    // Passes search type to parent
    props.onSearchTypeChange(searchType);
  }, [searchType]);

  return (
    <Navbar collapseOnSelect className='navBar' expand='lg' variant='dark'>
      <Container>
        <Navbar.Brand href='' className='logo'>
          Counterview.club
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link
              href='https://fapep.github.io/FABRIQUE/counterview.html'
              target='_blank'>
              About
            </Nav.Link>
            {/* <NavDropdown title="Donate" id="collasible-nav-dropdown">
                    <NavDropdown.Item
                        href=""
                        onClick={() => {navigator.clipboard.writeText("1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5")}}
                    >
                            <span className="text-wrap">Copy XCP Address</span>
                        </NavDropdown.Item>
                    </NavDropdown> */}
          </Nav>
          <Form
            className='d-flex'
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
            <InputGroup>
              {showComplete && (
                <Dropdown.Menu show as='div' className='w-100'>
                  {autoComplete.length >= 1 && (
                    <Dropdown.Header>Fakes</Dropdown.Header>
                  )}
                  {autoComplete.map(
                    (asset, i) =>
                      i < 10 && (
                        <Dropdown.Item
                          as='div'
                          onClick={(e) => {
                            search(e.target.innerText);

                            setShowComplete(false);
                          }}
                          key={i}>
                          {asset}
                        </Dropdown.Item>
                      )
                  )}
                  {addresses && (
                    <Dropdown.Header>Address History</Dropdown.Header>
                  )}
                  {addresses &&
                    addresses.map(
                      (address, i) =>
                        i < 5 && (
                          <Dropdown.Item
                            className='text-truncate'
                            style={{ textOverflow: "ellipsis" }}
                            as='div'
                            onClick={(e) => {
                              search(e.target.innerText);

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
            <Button
              variant='outline-success'
              className='search-button'
              onClick={() => {
                search(input);
              }}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
