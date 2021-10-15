import React, { useState, useEffect } from "react";
import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import Fetch from "./Fetch";
import AutoComplete from "./AutoComplete";
function NavBar(props) {
  const [input, setInput] = useState(""); // Search input box value
  const [result, setResult] = useState(""); // Fetch results

  // 1. Handles search input
  function handleInput(input) {
    setInput(input);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  // 2. Receives search input and filters length to determine if asset or address then fetches API data
  const search = async (value) => {
    // If text input is not length of address then search for asset
    if (value.length < 33) {
      const res = await Fetch("asset", value);
      setResult(res);
    } else {
      // Search an address
      const res = await Fetch("balances", value);
      setResult(res);
    }
  };

  // 3. Updates wallet values when async is complete
  useEffect(() => {
    // Passes JSON data to parent
    props.onDataChange(result);
  }, [result]);

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
              className={
                props.pepeFilter.original ? "selected-filter" : "nav-link"
              }
              onClick={() => {
                props.onFilterChange("original");
              }}>
              OG Peps
            </Nav.Link>
            <Nav.Link
              className={props.pepeFilter.fake ? "selected-filter" : "nav-link"}
              onClick={() => {
                props.onFilterChange("fake");
              }}>
              Fakes
            </Nav.Link>
            <Nav.Link href='https://fapep.github.io/FABRIQUE/' target='_blank'>
              About
            </Nav.Link>
          </Nav>
          <AutoComplete setInput={setInput} search={search} input={input} />
          <Form
            id='search-input'
            className='d-flex'
            onClick={(e) => {
              // console.log(e.target)
            }}
            onSubmit={(e) => {
              handleSubmit(e);
            }}>
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
