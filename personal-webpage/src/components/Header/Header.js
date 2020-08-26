import {Button, Form, FormControl, Image, Nav, Navbar} from "react-bootstrap";
import logo from "../../images/logo.svg";
import React from "react";
export const Header = () => {


    return (
        <Navbar bg="light" expand="lg" className={'border-info border-bottom'} >
            <Navbar.Brand href="#home"><Image id={'headerLogo'} src={logo}
                                              alt={'logo consisting of an isometric projection of a hypercube next to the words John the Dev'}
                                              className={'img-fluid d-block p-1'}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/"><p>Home</p></Nav.Link>
                    <Nav.Link href="#link"><p>Portfolio</p></Nav.Link>
                    <Nav.Link active href="/ContactForm"><p>Contact Me</p></Nav.Link>
                    <Nav.Link href="#link"><p>Blog</p></Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}