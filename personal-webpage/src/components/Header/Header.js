import {Button, Form, FormControl, Image, Nav, Navbar} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";

export const Header = () => {
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
    const scaleFactor=2;
    const PageActive = useState({
        'Home': false,
        'Hire Me': false,
        'Contact Me': false,
        'Blog': false
    });
    const scaleSvg = (number)=>{
        return number*scaleFactor;
    }
    const logo = <motion.svg xmlns="http://www.w3.org/2000/svg" width={scaleSvg(100)} height={scaleSvg(37)} variants={svgVariance}
                             initial={'hidden'} animate={'visible'}>
        <motion.g id="Logo_Image" transform="" variants={logoIconRoll}>
            <motion.g id="Rectangle_1" className="rectangles" transform={"translate("+scaleSvg(9.21)+")"} stroke="#252422" variants={rectangles(1)}>
                <rect width={scaleSvg(12.5)} height={scaleSvg(12.5)}/>
                <rect x={scaleSvg(-.25)} y={scaleSvg(-.25)} width={scaleSvg(13.0)} height={scaleSvg(13.0)}/>
            </motion.g>
            <motion.g id="Rectangle_2" className="rectangles" transform={"translate("+scaleSvg(8.95)+" "+scaleSvg(.15)+") rotate(45)"}
               stroke="#252422" variants={rectangles(2)}>
                <rect width={scaleSvg(12.5)} height={scaleSvg(12.5)}/>
                <rect x={scaleSvg(-.25)} y={scaleSvg(-.25)} width={scaleSvg(13.0)} height={scaleSvg(13.0)}/>
            </motion.g>
            <motion.g id="Rectangle_3" className="rectangles" transform={"translate("+scaleSvg(22.0)+" "+scaleSvg(.15)+") rotate(45)"}
               stroke="#252422" variants={rectangles(8)}>
                <rect width={scaleSvg(12.5)} height={scaleSvg(12.5)}/>
                <rect x={scaleSvg(-.25)} y={scaleSvg(-.25)} width={scaleSvg(13.0)} height={scaleSvg(13.0)}/>
            </motion.g>
            <motion.g id="Rectangle_4" className="rectangles" transform={"translate("+scaleSvg(18.45)+" "+scaleSvg(9.21)+")"}
               stroke="#252422" variants={rectangles(7)}>
                <rect width={scaleSvg(12.5)} height={scaleSvg(12.5)}/>
                <rect x={scaleSvg(-.25)} y={scaleSvg(-.25)} width={scaleSvg(13.0)} height={scaleSvg(13.0)}/>
            </motion.g>
            <motion.g id="Rectangle_5" className="rectangles" transform={"translate("+scaleSvg(9.21)+" "+scaleSvg(18.45)+")"}
               stroke="#252422" variants={rectangles(5)}>
                <rect width={scaleSvg(12.5)} height={scaleSvg(12.5)}/>
                <rect x={scaleSvg(-.25)} y={scaleSvg(-.25)} width={scaleSvg(13.0)} height={scaleSvg(13.0)}/>
            </motion.g>
            <motion.g id="Rectangle_6" className="rectangles" transform={"translate("+scaleSvg(22.0)+" "+scaleSvg(13.1)+")"+" rotate(45)"}
               stroke="#252422" variants={rectangles(6)}>
                <rect width={scaleSvg(12.5)} height={scaleSvg(12.5)}/>
                <rect x={scaleSvg(-.25)} y={scaleSvg(-.25)} width={scaleSvg(13.0)} height={scaleSvg(13.0)}/>
            </motion.g>
            <motion.g id="Rectangle_7" className="rectangles" transform={"translate("+scaleSvg(8.95)+" "+scaleSvg(13.1)+")"+" rotate(45)"}
               stroke="#252422" variants={rectangles(4)}>
                <rect width={scaleSvg(12.5)} height={scaleSvg(12.5)}/>
                <rect x={scaleSvg(-.25)} y={scaleSvg(-.25)} width={scaleSvg(13.0)} height={scaleSvg(13.0)}/>
            </motion.g>
            <motion.g id="Rectangle_8" className="rectangles" transform={"translate("+scaleSvg(0)+" "+scaleSvg(9.2075)+")"}
               stroke="#252422" variants={rectangles(3)}>
                <rect width={scaleSvg(12.5)} height={scaleSvg(12.5)}/>
                <rect x={scaleSvg(-.25)} y={scaleSvg(-.25)} width={scaleSvg(13.0)} height={scaleSvg(13.0)}/>
            </motion.g>
        </motion.g>
        <g id="Logo_Words" transform={"translate("+scaleSvg(34.9)+")"}>
            <text id="John" className="text" transform={"translate("+scaleSvg(15.6)+" "+scaleSvg(6)+")"} fill="#252422">
                <tspan x="0" y="19.0">John</tspan>
            </text>
            <text id="the_Dev" className="text" transform={"translate("+scaleSvg(16.6)+" "+scaleSvg(32.072)+")"} fill="#252422">
                <tspan x="0" y="-.5">the Dev</tspan>
            </text>
        </g>
    </motion.svg>
    switch ('/' + window.location.pathname.split('/')[1]) {
        case "/":
            PageActive['Home'] = true;
            break;
        case "/ContactForm":
            PageActive['Contact Me'] = true;
            break;
        case '/HireMe':
            PageActive['Hire Me'] = true;
            break;
        default:
            break;
    }
    !viewed&&sessionStorage.setItem('viewed', 'true');

    return (
        <Navbar bg="light" expand="lg" className={'border-info border-bottom'}>
            <Navbar.Brand href="#home">{logo}</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link disabled={PageActive['Home']} active={PageActive['Home']} href="/"><p>Home</p></Nav.Link>
                    <Nav.Link disabled={PageActive['Hire Me']} active={PageActive['Hire Me']} href='/HireMe'><p>Hire
                        Me</p></Nav.Link>
                    <Nav.Link disabled={PageActive['Contact Me']} active={PageActive['Contact Me']} href="/ContactForm">
                        <p>Contact Me</p></Nav.Link>
                    <Nav.Link disabled={PageActive['Blog']} active={PageActive['Blog']} href="/Blog"><p>Blog</p>
                    </Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-primary">Search</Button>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}