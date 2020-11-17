import {Button, Form, FormControl, Image, Nav, Navbar} from "react-bootstrap";
import logo from "../../images/logo.svg";
import React, {useState} from "react";
export const Header = () => {
const PageActive=useState({'Home':false,
    'Hire Me':false,
    'Contact Me':false,
    'Blog':false});
    switch ('/' + window.location.pathname.split('/')[1]){
        case "/":
            PageActive['Home']=true;
            break;
        case "/ContactForm":
            PageActive['Contact Me']=true;
            break;
        case '/HireMe':
            PageActive['Hire Me']=true;
            break;
        default:
            break;
    }
    return (
        <Navbar bg="light" expand="lg" className={'border-info border-bottom'} >
            <Navbar.Brand href="#home"><Image id={'headerLogo'} src={logo}
                                              alt={'logo consisting of an isometric projection of a hypercube next to the words John the Dev'}
                                              className={'img-fluid d-block p-1'}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link disabled={PageActive['Home']} active={PageActive['Home']} href="/"><p>Home</p></Nav.Link>
                    <Nav.Link disabled={PageActive['Hire Me']} active={PageActive['Hire Me']} href='/HireMe'><p>Hire Me</p></Nav.Link>
                    <Nav.Link disabled={PageActive['Contact Me']} active={PageActive['Contact Me']} href="/ContactForm"><p>Contact Me</p></Nav.Link>
                    <Nav.Link disabled={PageActive['Blog']} active={PageActive['Blog']} href="#link"><p>Blog</p></Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}