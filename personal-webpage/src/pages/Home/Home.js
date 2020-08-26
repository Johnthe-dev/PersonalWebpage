import React from "react";
import {Container, Navbar, Nav, Col, Row, Form, Button, FormControl, Image} from "react-bootstrap";
import headshot from '../../images/john.png';
import logo from '../../images/logo.svg'

export const Home = () => {

// console.log(window.localStorage.getItem('jwt-token')?(JSON.parse(window.localStorage.getItem('jwt-token')).expiry >= new Date().getTime()?JSON.parse(window.localStorage.getItem('jwt-token')).expiry:null):null);


    return (
            <Container>
                <Row className={"py-5 mr-0 justify-content-around"}>
                    <h2>This is where my call to action will go</h2>
                </Row>
                <Row className={"mr-0 d-flex align-items-center justify-content-around"}>
                    <Col className={'col-6 text-center'}>
                        <img id={'johnPicture'} alt={'John'} src={headshot}/>
                    </Col>

                    <Col className={'col-4 text-left'}>
                        <p>This will be where I introduce myself and have a profile pic. Maybe a brief blurb about my
                            history in
                            coding, a brief explanation of my experience at Deep Dive, and a blurb about the App
                            Contest. Perhaps
                            I will also include some information about my current projects.</p>
                    </Col>
                </Row>
            </Container>
    )
};