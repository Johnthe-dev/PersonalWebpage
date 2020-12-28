import React from 'react';
import {Col, Container, Row} from "react-bootstrap";
import {motion} from "framer-motion";

export const Testing = ()=>{
    const svgVariance = {
        hidden:{rotate: -180},
        visible:{
            rotate: 0,
            transition:{duration : 2,
                        ease: 'easeInOut'}
        }
    }
    return(
        <Container>
            <Row>
            <Col>

                <motion.svg xmlns="http://www.w3.org/2000/svg" width="365" height="365" variants={svgVariance}
                initial={'hidden'} animate={'visible'}>
                    <g id="Logo_Image" transform="translate(5 30.72)">
                        <g id="Rectangle_1" className="rectangles" transform="translate(92.1)" stroke="currentcolor">
                            <rect width="125" height="125"/>
                            <rect x="-2.5" y="-2.5" width="130" height="130"/>
                        </g>
                        <g id="Rectangle_2" className="rectangles" transform="translate(89.5 1.5) rotate(45)"
                           stroke="currentcolor">
                            <rect width="125" height="125"/>
                            <rect x="-2.5" y="-2.5" width="130" height="130"/>
                        </g>
                        <g id="Rectangle_3" className="rectangles" transform="translate(220 1.5) rotate(45)"
                           stroke="currentcolor">
                            <rect width="125" height="125"/>
                            <rect x="-2.5" y="-2.5" width="130" height="130"/>
                        </g>
                        <g id="Rectangle_4" className="rectangles" transform="translate(184.5 92.1)"
                           stroke="currentcolor">
                            <rect width="125" height="125"/>
                            <rect x="-2.5" y="-2.5" width="130" height="130"/>
                        </g>
                        <g id="Rectangle_5" className="rectangles" transform="translate(92.1 184.5)"
                           stroke="currentcolor">
                            <rect width="125" height="125"/>
                            <rect x="-2.5" y="-2.5" width="130" height="130"/>
                        </g>
                        <g id="Rectangle_6" className="rectangles" transform="translate(220 131) rotate(45)"
                           stroke="currentcolor">
                            <rect width="125" height="125"/>
                            <rect x="-2.5" y="-2.5" width="130" height="130"/>
                        </g>
                        <g id="Rectangle_7" className="rectangles" transform="translate(89.5 131) rotate(45)"
                           stroke="currentcolor">
                            <rect width="125" height="125"/>
                            <rect x="-2.5" y="-2.5" width="130" height="130"/>
                        </g>
                        <g id="Rectangle_8" className="rectangles" transform="translate(0 92.075)"
                           stroke="currentcolor">
                            <rect width="125" height="125"/>
                            <rect x="-2.5" y="-2.5" width="130" height="130"/>
                        </g>
                    </g>
                </motion.svg>
            </Col>
            </Row>
        </Container>
    )
}