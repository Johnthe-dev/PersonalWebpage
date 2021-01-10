import React, {useState} from "react";
import {Container, Navbar, Nav, Col, Row, Form, Button, FormControl, Image} from "react-bootstrap";
import headshot from '../../images/john.png';
import logo from '../../images/logo.svg'
import {motion} from "framer-motion";

export const Home = () => {

// console.log(window.localStorage.getItem('jwt-token')?(JSON.parse(window.localStorage.getItem('jwt-token')).expiry >= new Date().getTime()?JSON.parse(window.localStorage.getItem('jwt-token')).expiry:null):null);
//SVG Stuff
    let svgVariance = {};
    const viewed = sessionStorage.getItem('viewed');
    let logoIconRoll = {
        hidden: {
            rotate: !viewed?0:-180,
            x: 20.7,
            y: 3.072
        },
        visible: {
            rotate: 0,
            x: 20.7,
            y: 3.072,
            transition: {
                duration: 2,
                ease: 'easeInOut'
            }
        }
    };
    let rectangles = (number)=>{
        return {
            hidden:{
                opacity: !viewed?0:1
            },
            visible:{
                opacity: 1,
                transition: {
                    delay: number/4,
                    duration:1,
                    ease: 'easeInOut'
                }
            }
        };
    };
    const scaleFactor=20;
    const PageActive = useState({
        'Home': false,
        'Hire Me': false,
        'Contact Me': false,
        'Blog': false
    });
    const scaleSvg = (number, row=0)=>{
        return (number+10*row/Math.sqrt(2))*scaleFactor;
    }
    //End of SVG stuff

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