import React from "react";
import {Navbar, Nav, Col, Row, Form, Button, FormControl, Image} from "react-bootstrap";
import headshot from '../../images/john.png';
import logo from '../../images/logo.svg'
export const Home = () => {

// console.log(window.localStorage.getItem('jwt-token')?(JSON.parse(window.localStorage.getItem('jwt-token')).expiry >= new Date().getTime()?JSON.parse(window.localStorage.getItem('jwt-token')).expiry:null):null);


    return (
        <>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home"><Image id={'headerLogo'} src={logo} alt={'logo consisting of an isometric projection of a hypercube next to the words John the Dev'} className={'img-fluid d-block p-1'}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home"><p>Home</p></Nav.Link>
                        <Nav.Link href="#link"><p>Portfolio</p></Nav.Link>
                        <Nav.Link href="#link"><p>Contact Me</p></Nav.Link>
                        <Nav.Link href="#link"><p>Blog</p></Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
            <Row className={"py-5 mr-0 justify-content-around"}>
                <h2>This is where my call to action will go</h2>
            </Row>
            <Row className={"mr-0 d-flex align-items-center"}>
                <Col className={'col-8'}>
                    <img alt={'John'} src={headshot}/>
                </Col>

                <Col className={'col'}>
                <p>This will be where I introduce myself and have a profile pic. Maybe a brief blurb about my history in
                    coding, a brief explanation of my experience at Deep Dive, and a blurb about the App Contest. Perhaps
                    I will also include some information about my current projects.</p>
                </Col>
            </Row>
        </>
    )
};