import React from "react";
import {Container, Col, Row, Image} from "react-bootstrap";
import NavLink from "react-bootstrap/NavLink";
import javascriptIcon from "../../images/javascript-icon.png"
import phpIcon from "../../images/php-logo.png"
import mysqlIcon from "../../images/mysql-logo.png"
import linuxIcon from "../../images/linux-logo.png"
import githubIcon from "../../images/github-logo.png"
import xdIcon from "../../images/xd-icon.png"
import NMSavin from "../../images/NMSavin.png"
import ABQVeterans from "../../images/ABQVeterans.png"
import rphiRebuild from "../../images/rphiRebuild.png"
import resume from "../../resume/Resume.pdf"

export const Portfolio = () => {
    return (
        <Container>
            <Row className={"py-5 justify-content-around"}>
                <h2>Happy to help</h2>
            </Row>
            <Row className={"pb-3 d-flex align-items-center justify-content-around"}>
                <NavLink href={'#technologies'}>Technologies</NavLink>
                <NavLink href={'#projects'}>Projects</NavLink>
                <NavLink>Awards</NavLink>
                <NavLink href={resume} download={resume}>Resume</NavLink>
            </Row>
            <Row className={"pt-3 d-flex align-items-center justify-content-center"}>
                <Col className={'col-10 col-md-6 text-left'}>
                    <p>I am John Johnson-Rodgers, a web developer based out of Albuquerque, New Mexico. I am interested
                        in
                        projects that will have positive social impacts on our community. I take pride in my work and
                        thrive{' '}<span id={'technologies'}/>
                        while taking on challenging tasks. Message me if you are interested in working together.</p>
                </Col>
            </Row>
            <Row className={"pb-3 pt-5 justify-content-around"}>
                <h3>Technologies</h3>
            </Row>
            <Row className={"pt-3 d-flex align-items-center justify-content-around"}>
                <Col className={'col-12 col-md-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'javascriptLogo'} src={javascriptIcon}
                               alt={'logo for javascript'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                    <Row className='d-md-none m-3 logo-card' aria-label='Javascript Technologies'>
                        <ul>
                            <li>ReactJS</li>
                            <li>Redux</li>
                            <li>ES6</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-12 col-md-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'phpLogo'} src={phpIcon}
                               alt={'logo for php'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                    <Row className='d-md-none m-3 logo-card' aria-label='PHP Technologies'>
                        <ul>
                            <li>PHP 7+</li>
                            <li>API Construction</li>
                            <li>Object Oriented</li>
                            <li>Unit Testing</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-12 col-md-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'mysqlLogo'} src={mysqlIcon}
                               alt={'logo for mysql'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                    <Row className='d-md-none m-3 logo-card' aria-label='MySQL Technologies'>
                        <ul>
                            <li>Query Building</li>
                            <li>Database Design</li>
                        </ul>
                    </Row>
                </Col>

            </Row>
            <Row className={"d-none pt-3 d-md-flex justify-content-around"}>
                <Col className={'col-md-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='Javascript Technologies'>
                        <ul>
                            <li>ReactJS</li>
                            <li>Redux</li>
                            <li>ES6</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-md-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='PHP Technologies'>
                        <ul>
                            <li>PHP 7+</li>
                            <li>API Construction</li>
                            <li>Object Oriented</li>
                            <li>Unit Testing</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-12 col-md-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='MySQL Technologies'>
                        <ul>
                            <li>Query Building</li>
                            <li>Database Design</li>
                        </ul>
                    </Row>
                </Col>
            </Row>
            <Row className={"pt-3 d-flex align-items-center justify-content-around"}>
                <Col className={'col-12 col-md-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'linuxLogo'} src={linuxIcon}
                               alt={'logo for linux'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                    <Row className='d-md-none m-3 logo-card' aria-label='Linux Technologies'>
                        <ul>
                            <li>Command Line</li>
                            <li>Basic VIM</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-12 col-md-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'githubLogo'} src={githubIcon}
                               alt={'logo for github'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                    <Row className='d-md-none m-3 logo-card' aria-label='git Technologies'>
                        <ul>
                            <li>Distributed Version Control</li>
                            <li>Detailed Commit Messages</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-12 col-md-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'xdLogo'} src={xdIcon}
                               alt={'logo for Adobe XD'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                    <Row className='d-md-none m-3 logo-card' aria-label='Adobe XD Experience'>
                        <ul>
                            <li>Low and High Fidelity Prototyping</li>
                            <li>Icon and Logo Creation</li>
                        </ul>
                    </Row>
                </Col>
            </Row>
            <Row className={"d-none pt-3 d-md-flex justify-content-around"}>
                <Col className={'col-md-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='Linux Technologies'>
                        <ul>
                            <li>Command Line</li>
                            <li>Basic VIM</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-md-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='git Technologies'>
                        <ul>
                            <li>Distributed Version Control</li>
                            <li>Detailed Commit Messages</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-md-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='Adobe XD Experience'>
                        <ul>
                            <li>Low and High Fidelity Prototyping</li>
                            <li>Icon and Logo Creation</li>
                        </ul>
                    </Row>
                </Col>
            </Row>


            <span id={'projects'}/>
            <Row className={"pb-md-3 pt-5 justify-content-around"}>
                <h3>Projects</h3>
            </Row>
            <Row className={"pb-3 py-md-5 d-flex justify-content-around align-content-center"}>
                <Col className="col-12 col-md-4 px-0 mx-0 pb-3 pb-md-4">
                    <div className="hover-effect">
                        <img className="img-responsive" src={NMSavin} alt="Screen shot of NMSavin"/>
                            <div className="overlay">
                                <h2>NMSAVIN</h2>
                                <a className="info" href="#">Learn More</a>
                            </div>
                    </div>
                </Col>
                <Col>
                    <h4 className={'pb-3 pb-md-4 px-4'}>Victim Notification System</h4>
                    <p className={'pl-3 text-wrap'}>
                        NMSAVIN was built to help New Mexicans stay updated on criminal cases that are important to them.
                        Unfortunately it was running on outdated language versions, performed inconsistently, and required
                        manual upkeep. My first professional project was a complete redesign and rebuild of a tool used to
                        help keep our community informed and safe.</p>
                </Col>
            </Row>
            <Row className={"pb-3 py-md-5 d-flex justify-content-around align-content-center flex-row-reverse"}>
                <Col className="col-12 col-md-4 px-0 mx-0 pb-3 pb-md-4">
                    <div className="hover-effect">
                        <img className="img-responsive" src={ABQVeterans} alt="Screen shot of ABQ Veterans"/>
                        <div className="overlay">
                            <h2>ABQVeterans</h2>
                            <a className="info" href="#">Learn More</a>
                        </div>
                    </div>
                </Col>
                <Col>
                    <h4 className={'pb-3 pb-md-4 px-4'}>ABQ Veterans</h4>
                    <p className={'pr-3 text-wrap'}>
                        ABQ Veterans was born out of the capstone idea of a classmate at Deep Dive Coding Bootcamp. He
                        described a tool that veterans in our community to connect to local resources. We took the
                        resulting application on to victory in the seventh-annual UNM and CNM Mobile App Contest.</p>
                </Col>
            </Row>
            <Row className={"pb-3 py-md-5 d-flex justify-content-around align-content-center"}>
                <Col className="col-12 col-md-4 px-0 mx-0 pb-3 pb-md-4">
                    <div className="hover-effect">
                        <img className="img-responsive" src={rphiRebuild} alt="Screen shot of local contractor's website"/>
                        <div className="overlay">
                            <h2>RPHI Rebuild</h2>
                            <a className="info" href="#">Learn More</a>
                        </div>
                    </div>
                </Col>
                <Col>
                    <h4 className={'pb-3 pb-md-4 px-4'}>Rodgers Plumbing and Heating, Inc</h4>
                    <p className={'pl-3 text-wrap'}>
                        I began my journey into web development with a redesign of the website for my father's company.
                        The site was not mobile friendly and had an outdated design. I brought it up to date cosmetically
                        and reduced the specificity of a few elements to remove the need for constant updates.</p>
                </Col>
            </Row>
        </Container>
    )
};