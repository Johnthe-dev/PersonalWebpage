import React from "react";
import {Container, Navbar, Nav, Col, Row, Form, Button, FormControl, Image} from "react-bootstrap";
import NavLink from "react-bootstrap/NavLink";
import javascriptIcon from "../../images/javascript-icon.png"
import phpIcon from "../../images/php-logo.png"
import mysqlIcon from "../../images/mysql-logo.png"
import linuxIcon from "../../images/linux-logo.png"
import githubIcon from "../../images/github-logo.png"
import xdIcon from "../../images/xd-icon.png"
import resume from "../../resume/Resume.pdf"

export const Portfolio = () => {
    return (
        <Container>
            <Row className={"py-5 justify-content-around"}>
                <h2>Happy to help</h2>
            </Row>
            <Row className={"pb-3 d-flex align-items-center justify-content-around"}>
                <NavLink href={'#technologies'}>Technologies</NavLink>
                <NavLink>Projects</NavLink>
                <NavLink>Awards</NavLink>
                <NavLink href={resume} download={resume}>Resume</NavLink>
            </Row>
            <Row className={"pt-3 d-flex align-items-center justify-content-center"}>
                <Col className={'col-6 text-left'}>
                    <p>I am John Johnson-Rodgers, a web developer based out of Albuquerque, New Mexico. I am interested
                        in
                        projects that will have positive social impacts on our community. I take pride in my work and
                        thrive<span id={'technologies'}/>
                        while taking on challenging tasks. Message me if you are interested in working together.</p>
                </Col>
            </Row>
            <Row className={"pb-3 pt-5 justify-content-around"}>
                <h3>Technologies</h3>
            </Row>
            <Row className={"pt-3 d-flex align-items-center justify-content-around"}>
                <Col className={'col-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'javascriptLogo'} src={javascriptIcon}
                               alt={'logo for javascript'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                </Col>
                <Col className={'col-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'phpLogo'} src={phpIcon}
                               alt={'logo for php'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                </Col>
                <Col className={'col-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'mysqlLogo'} src={mysqlIcon}
                               alt={'logo for mysql'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                </Col>

            </Row>
            <Row className={"pt-3 d-flex justify-content-around"}>
                <Col className={'col-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='Javascript Technologies'>
                        <ul>
                            <li>ReactJS</li>
                            <li>Redux</li>
                            <li>ES6</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='PHP Technologies'>
                        <ul>
                            <li>PHP 7+</li>
                            <li>API Construction</li>
                            <li>Object Oriented</li>
                            <li>Unit Testing</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='MySQL Technologies'>
                        <ul>
                            <li>Query Building</li>
                            <li>Database Design</li>
                        </ul>
                    </Row>
                </Col>
            </Row>
            <Row className={"pt-3 d-flex align-items-center justify-content-around"}>
                <Col className={'col-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'linuxLogo'} src={linuxIcon}
                               alt={'logo for linux'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                </Col>
                <Col className={'col-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'githubLogo'} src={githubIcon}
                               alt={'logo for github'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                </Col>
                <Col className={'col-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'xdLogo'} src={xdIcon}
                               alt={'logo for Adobe XD'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                </Col>
            </Row>
            <Row className={"pt-3 d-flex justify-content-around"}>
                <Col className={'col-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='Linux Technologies'>
                        <ul>
                            <li>Command Line</li>
                            <li>Basic VIM</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='git Technologies'>
                        <ul>
                            <li>Distributed Version Control</li>
                            <li>Detailed Commit Messages</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='Adobe XD Experience'>
                        <ul>
                            <li>Low and High Fidelity Prototyping</li>
                            <li>Icon and Logo Creation</li>
                        </ul>
                    </Row>
                </Col>
            </Row>
            <Row className={"pt-3 d-flex align-items-center justify-content-around"}>

            </Row>
        </Container>
    )
};