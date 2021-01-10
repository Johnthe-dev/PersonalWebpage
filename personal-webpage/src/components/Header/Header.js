import {Button, Form, FormControl, Image, Nav, Navbar} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {motion} from "framer-motion";

export const Header = () => {
    let svgVariance = {};
    const viewed = sessionStorage.getItem('viewed');
    let logoIconRoll = {
        // hidden: {
        //     rotate: !viewed?0:-180,
        //     x: 20.7,
        //     y: 3.072
        // },
        // visible: {
        //     rotate: 0,
        //     x: 20.7,
        //     y: 3.072,
        //     transition: {
        //         duration: 2,
        //         ease: 'easeInOut'
        //     }
        // }
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
                        duration:.5,
                        ease: 'easeInOut'
                    }
                }
            };
    };
    let lines = (line, square)=>{
        let number = 0;
        switch (line){
            case 'outer':
                number = 1*square;
                break;
            case 'positive':
                number = 2*square;
                break;
            case 'inner':
                number = 3*square;
                break;
            case 'negative':
                number = 4*square;
                break;
        }
        return {
            hidden:{
                opacity: viewed?0:1
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
    const scaleFactor=3;
    const PageActive = useState({
        'Home': false,
        'Hire Me': false,
        'Contact Me': false,
        'Blog': false
    });
    const scaleSvg = (number, row=0)=>{
        return (number+10*row/Math.sqrt(2))*scaleFactor;
    }
    const logo = <motion.svg xmlns="http://www.w3.org/2000/svg" width={scaleSvg(100)} height={scaleSvg(30)} variants={svgVariance}
                             initial={'hidden'} animate={'visible'}>
        <motion.g id="Logo_Image" transform="" variants={logoIconRoll}>
                <motion.g id="Rectangle_1" variants={rectangles(1)}>{/*Middle Left*/}
                    <motion.line variants={lines('outer', 1)} x1={scaleSvg(5)} x2={scaleSvg(5)} y1={scaleSvg(9.92)} y2={scaleSvg(20.08)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Outer*/}
                    <motion.line variants={lines('positive', 1)} x1={scaleSvg(5)} x2={scaleSvg(15)} y1={scaleSvg(10)} y2={scaleSvg(10)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Positive*/}
                    <motion.line variants={lines('inner', 1)} x1={scaleSvg(15)} x2={scaleSvg(15)} y1={scaleSvg(10)} y2={scaleSvg(20)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Inner*/}
                    <motion.line variants={lines('negative', 1)} x1={scaleSvg(5)} x2={scaleSvg(15)} y1={scaleSvg(20)} y2={scaleSvg(20)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Negative*/}
                </motion.g>
            <motion.g id="Rectangle_2" variants={rectangles(2)}>{/*Top Left*/}
                    <motion.line variants={lines('outer', 2)} x1={scaleSvg(4.92)} x2={scaleSvg(5.08, 1)} y1={scaleSvg(10.08)} y2={scaleSvg(9.92, -1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Outer*/}
                    <motion.line variants={lines('positive', 2)} x1={scaleSvg(5, 1)} x2={scaleSvg(5, 2)} y1={scaleSvg(10,-1)} y2={scaleSvg(10)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Positive*/}
                    <motion.line variants={lines('negative', 2)} x1={scaleSvg(5)} x2={scaleSvg(5, 1)} y1={scaleSvg(10)} y2={scaleSvg(10, 1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Negative*/}
                    <motion.line variants={lines('inner', 2)} x1={scaleSvg(5, 1)} x2={scaleSvg(5, 2)} y1={scaleSvg(10,1)} y2={scaleSvg(10)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Inner*/}
            </motion.g>
            <motion.g id="Rectangle_3" variants={rectangles(3)}>{/*Top Middle*/}
                <motion.line variants={lines('outer', 3)} x1={scaleSvg(15.08, 1)} x2={scaleSvg(4.92, 1)} y1={scaleSvg(10, -1)} y2={scaleSvg(10, -1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Outer*/}
                <motion.line variants={lines('positive', 3)} x1={scaleSvg(15, 1)} x2={scaleSvg(15, 1)} y1={scaleSvg(20, -1)} y2={scaleSvg(10, -1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Positive*/}
                <motion.line variants={lines('inner', 3)} x1={scaleSvg(15, 1)} x2={scaleSvg(5, 1)} y1={scaleSvg(20, -1)} y2={scaleSvg(20, -1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Inner*/}
                <motion.line variants={lines('negative', 3)} x1={scaleSvg(5, 1)} x2={scaleSvg(5, 1)} y1={scaleSvg(20, -1)} y2={scaleSvg(10, -1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Negative*/}
            </motion.g>
            <motion.g id="Rectangle_4" variants={rectangles(4)}>{/*Top Right*/}
                <motion.line variants={lines('outer', 4)} x1={scaleSvg(14.92, 1)} x2={scaleSvg(15.08, 2)} y1={scaleSvg(9.92,-1)} y2={scaleSvg(10.08)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Outer*/}
                <motion.line variants={lines('positive', 4)} x1={scaleSvg(15, 1)} x2={scaleSvg(15, 2)} y1={scaleSvg(10,1)} y2={scaleSvg(10)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Positive*/}
                <motion.line variants={lines('inner', 4)} x1={scaleSvg(15)} x2={scaleSvg(15, 1)} y1={scaleSvg(10)} y2={scaleSvg(10, 1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Inner*/}
                <motion.line variants={lines('negative', 4)} x1={scaleSvg(15)} x2={scaleSvg(15, 1)} y1={scaleSvg(10)} y2={scaleSvg(10, -1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Negative*/}
            </motion.g>
            <motion.g id="Rectangle_5" variants={rectangles(5)}>{/*Middle Right*/}
                <motion.line variants={lines('outer', 5)} x1={scaleSvg(15, 2)} x2={scaleSvg(15, 2)} y1={scaleSvg(9.92)} y2={scaleSvg(20.08)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Outer*/}
                <motion.line variants={lines('positive', 5)} x1={scaleSvg(15, 2)} x2={scaleSvg(5, 2)} y1={scaleSvg(20)} y2={scaleSvg(20)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Positive*/}
                <motion.line variants={lines('inner', 5)} x1={scaleSvg(5, 2)} x2={scaleSvg(5, 2)} y1={scaleSvg(10)} y2={scaleSvg(20)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Inner*/}
                <motion.line variants={lines('negative', 5)} x1={scaleSvg(15, 2)} x2={scaleSvg(5, 2)} y1={scaleSvg(10)} y2={scaleSvg(10)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Negative*/}
            </motion.g>
            <motion.g id="Rectangle_6" variants={rectangles(6)}>{/*Bottom Right*/}
                <motion.line variants={lines('outer', 6)} x1={scaleSvg(14.92, 1)} x2={scaleSvg(15.08, 2)} y1={scaleSvg(20.08,1)} y2={scaleSvg(19.92)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Outer*/}
                <motion.line variants={lines('positive', 6)} x1={scaleSvg(15)} x2={scaleSvg(15, 1)} y1={scaleSvg(20)} y2={scaleSvg(20, 1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Positive*/}
                <motion.line variants={lines('inner', 6)} x1={scaleSvg(15)} x2={scaleSvg(15, 1)} y1={scaleSvg(20)} y2={scaleSvg(20, -1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Inner*/}
                <motion.line variants={lines('negative', 6)} x1={scaleSvg(15, 1)} x2={scaleSvg(15, 2)} y1={scaleSvg(20,-1)} y2={scaleSvg(20)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Negative*/}
            </motion.g>
            <motion.g id="Rectangle_7" variants={rectangles(7)}>{/*Bottom Middle*/}
                    <motion.line variants={lines('outer', 7)} x1={scaleSvg(15.08, 1)} x2={scaleSvg(4.92, 1)} y1={scaleSvg(20, 1)} y2={scaleSvg(20, 1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Outer*/}
                    <motion.line variants={lines('positive', 7)} x1={scaleSvg(5, 1)} x2={scaleSvg(5, 1)} y1={scaleSvg(10, 1)} y2={scaleSvg(20, 1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Positive*/}
                    <motion.line variants={lines('inner', 7)} x1={scaleSvg(15, 1)} x2={scaleSvg(5, 1)} y1={scaleSvg(10, 1)} y2={scaleSvg(10, 1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Inner*/}
                    <motion.line variants={lines('negative', 7)} x1={scaleSvg(15, 1)} x2={scaleSvg(15, 1)} y1={scaleSvg(10, 1)} y2={scaleSvg(20, 1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Negative*/}
            </motion.g>
            <motion.g id="Rectangle_8" variants={rectangles(8)}>{/*Bottom Left*/}
                <motion.line variants={lines('outer', 8)} x1={scaleSvg(4.92)} x2={scaleSvg(5.08, 1)} y1={scaleSvg(19.92)} y2={scaleSvg(20.08, 1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Outer*/}
                <motion.line variants={lines('positive', 8)} x1={scaleSvg(5)} x2={scaleSvg(5, 1)} y1={scaleSvg(20)} y2={scaleSvg(20, -1)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Positive*/}
                <motion.line variants={lines('inner', 8)} x1={scaleSvg(5, 1)} x2={scaleSvg(5, 2)} y1={scaleSvg(20,-1)} y2={scaleSvg(20)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Inner*/}
                <motion.line variants={lines('negative', 8)} x1={scaleSvg(5, 1)} x2={scaleSvg(5, 2)} y1={scaleSvg(20,1)} y2={scaleSvg(20)} stroke="#252422" strokeWidth={scaleSvg(.8)+'px'}/>{/*Negative*/}
            </motion.g>
        </motion.g>
        <g id="Logo_Words" transform={"translate("+scaleSvg(30)+")"}>
            <text id="John" className="text" transform={"translate("+scaleSvg(15.6)+" "+scaleSvg(11)+")"} fill="#252422">
                <tspan x="0" y="19.0">John</tspan>
            </text>
            <text id="the_Dev" className="text" transform={"translate("+scaleSvg(21.6)+" "+scaleSvg(27.072)+")"} fill="#252422">
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