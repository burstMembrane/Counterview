import React, { useState, useEffect } from "react"
import { Container, Nav, Navbar, NavDropdown, Form, FormControl, Button } from "react-bootstrap"
import Fetch from "./Fetch"

function NavBar(props) {
    const [ input, setInput ] = useState("")    // Search input box value
    const [ result, setResult ] = useState("")  // Fetch results
    const [ searchType, setSearchType ] = useState("")

    // 1. Handles search input
    function handleInput(input) {
        setInput(input)
    }

    // 2. Receives search input and filters length to determine if asset or address then fetches API data
    const search = async (value) => {

        // If text input is not length of address then search for asset
        if(value.length < 33) {
            // setResult(Fetch("asset", searchValue))
            const res = await Fetch("asset", value)
            setResult(res)
            setSearchType("asset")
        } else {
        // Search an address
            // setResult(Fetch("address", searchValue))
            const res = await Fetch("balances", value)
            setResult(res)
            setSearchType("address")
        }
    }

    // 3. Updates wallet values when async is complete
    useEffect(() => {
        // Passes JSON data to parent
        props.onDataChange(result)
    }, [result])

    useEffect(() => {
        // Passes search type to parent
        props.onSearchTypeChange(searchType)
    }, [searchType])

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="">Counterview.club</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link href="">About</Nav.Link> */}
                    <NavDropdown title="Donate" id="collasible-nav-dropdown">
                    <NavDropdown.Item 
                        href=""
                        onClick={() => {navigator.clipboard.writeText("1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5")}}
                    >
                            <span className="text-wrap">Copy: 1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5</span>
                        </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search asset or address"
                    className="mr-2 search-field"
                    aria-label="Search"
                    onChange={(e)=>{
                        handleInput(e.target.value)
                    }}
                />
                <Button 
                    variant="outline-success"
                    className="search-button"
                    onClick={() => {
                        search(input)
                    }}
                >Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar