import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
// import NavDropdown from 'react-bootstrap/NavDropdown';


function MainNavbar() {
  const [searchInput, setSearchInput] = useState("")

  const handleChange = (event) => {
    setSearchInput(event.target.value)
    console.log(event.target.value);
    // console.log(searchInput);

    axios
    .post("http://localhost:5000/api/search", {word: event.target.value})
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log('Error from Search');
    })
  }


  return (
    <Navbar expand="lg" >
      <Container fluid style={{maxWidth: "1200px"}}>
        <Navbar.Brand href="/" style={{fontWeight: '800', color:'white'}}>
          <img src={require("../logo/webtoonguru-nav.png")} alt="WebtoonGuru-logo" width={130}></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{maxHeight: '100px'}}
            navbarScroll
          >
            <Nav.Link className='main-navbar-navlink' href="/">오늘의 웹툰</Nav.Link>
            <Nav.Link className='main-navbar-navlink' href="/webtoon/list">전체보기</Nav.Link>
            <Nav.Link className='main-navbar-navlink' href="/genre/romance">장르별</Nav.Link>
            <Nav.Link className='main-navbar-navlink' href="/date/월">요일별</Nav.Link>
            <Nav.Link className='main-navbar-navlink' href="/platform">플랫폼별</Nav.Link>
            {/* <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown> */}

          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              as="input"
              placeholder="제목 / 작가로 검색"
              className="me-2"
              aria-label="Search"
              onChange={handleChange}
            />
  
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar 