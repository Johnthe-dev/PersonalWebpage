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
import cSharp from "../../images/CSharpLogo.png"
import award from "../../images/AppContestAward.jpg"
import commandCenter from "../../images/command-center.png"
import bam from "../../images/bam.PNG"
import reactLogo from "../../images/reactJS.png"

export const Portfolio = () => {
    return (
        <Container>
            <Row className={"py-5 justify-content-around"}>
                <h2>Like What You See?</h2>
            </Row>
            <span id={'technologies'}/>
            <Row className={"pb-3 d-flex align-items-center justify-content-around"}>
                <NavLink href={'#technologies'}>Technologies</NavLink>
                <NavLink href={'#projects'}>Projects</NavLink>
                <NavLink href={'#awards'}>Awards</NavLink>
                <NavLink href={resume} download={resume}>Resume</NavLink>
            </Row>
            <Row className={"pb-3 pt-5 justify-content-around"}>
                <h3>Technologies</h3>
            </Row>
            <Row className={"pt-3 d-flex align-items-center justify-content-around"}>
                <Col className={'col-12 col-md-3'}>
                    <Row className={"d-flex justify-content-around"}>
                        <Image id={'cSharpLogo'} src={cSharp}
                               alt={'logo for c sharp'}
                               className={'d-block p-1 logo-icon'}/>
                    </Row>
                    <Row className='d-md-none m-3 logo-card' aria-label='C# Technologies'>
                        <ul>
                            <li>API Construction</li>
                            <li>Service Construction</li>
                            <li>.Net</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-12 col-md-3'}>
                <Row className={"d-flex justify-content-around"}>
                    <Image id={'reactLogo'} src={reactLogo}
                           alt={'logo for ReactJS'}
                           className={'d-block p-1 logo-icon'}/>
                </Row>
                <Row className='d-md-none m-3 logo-card' aria-label='ReactJS'>
                    <ul>
                        <li>Componentization</li>
                        <li>State Management</li>
                        <li>Lifecycle Management</li>
                    </ul>
                </Row>
            </Col>
            </Row>
            <Row className={"d-none pt-3 d-md-flex justify-content-around"}>
                <Col className={'col-md-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='C# Technologies'>
                        <ul>
                            <li>API Construction</li>
                            <li>Service Construction</li>
                            <li>.Net</li>
                        </ul>
                    </Row>
                </Col>
                <Col className={'col-md-3 py-3 logo-card d-flex justify-content-start'}>
                    <Row aria-label='ReactJs'>
                        <ul>
                            <li>Componentization</li>
                            <li>State Management</li>
                            <li>Lifecycle Management</li>
                        </ul>
                    </Row>
                </Col>
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
                            <li>ES6-ES10</li>
                            <li>TypeScript</li>
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
                            <li>ES6-ES10</li>
                            <li>TypeScript</li>
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
                <h3>Public Projects</h3>
            </Row>
            <Row className={"pb-3 py-md-5 d-flex justify-content-around align-content-center"}>
                <Col className="col-12 col-md-4 px-0 mx-0 pb-3 pb-md-4">
                    <img className="w-100" src={bam} alt="Screen shot of Blue Access for Members"/>
                </Col>
                <Col>
                    <h4 className={'pb-3 pb-md-4 px-4'}>Blue Access for Members (BAM)</h4>
                    <p className={'pl-3 text-wrap'}>
                        BAM is the member facing web applications that policy holders use to view claim details, account
                        information, and resources for their Blue Cross Blue Shield accounts in IL, TX, MT, OK, and NM.
                        Members can also update their Primary Care Provider, search for local pharmacies, and find
                        pharmacies that have certain prescription drugs in stock and the price of a prescription. I
                        acted as a senior engineer for the team that dealt with drug prices, pharmacy searches, and SSO
                        connections to our partners. I also led the conversion to a micro-frontend architecture using
                        single-spa, a javascript library that turns entire react projects into parcels, allowing more
                        autonomy amongst our teams and making the initial load smaller to limit loading to what clients
                        access.
                    </p>
                </Col>
            </Row>
            <Row className={"pb-3 py-md-5 d-flex justify-content-around align-content-center flex-row-reverse"}>
                <Col className="col-12 col-md-4 px-0 mx-0 pb-3 pb-md-4">
                    <img className="w-100" src={commandCenter} alt="Screen shot of nQueue Command Center"/>
                </Col>
                <Col>
                    <h4 className={'pb-3 pb-md-4 px-4'}>ScanQ Command Center</h4>
                    <p className={'pl-3 text-wrap'}>
                        The Command Center is on-site software used by legal firms across the globe to manage accounts,
                        API Access, and software configuration for a suite of legal software at nqZebraworks. I helped
                        add functionality and improve efficiency to existing features and adding new features to
                        accommodate new products. One example of a feature that I completed was a retention policy that
                        helped our largest clients target information and files for removal after a configurable amount
                        of time and a service to execute the policy.
                    </p>
                </Col>
            </Row>
            <Row className={"pb-3 py-md-5 d-flex justify-content-around align-content-center"}>
                <Col className="col-12 col-md-4 px-0 mx-0 pb-3 pb-md-4">
                    <img className="w-100" src={NMSavin} alt="Screen shot of NMSavin"/>
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
                    <img className="w-100" src={ABQVeterans} alt="Screen shot of ABQ Veterans"/>
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
                    <img className="w-100" src={rphiRebuild} alt="Screen shot of local contractor's website"/>
                </Col>
                <Col>
                    <h4 className={'pb-3 pb-md-4 px-4'}>Rodgers Plumbing and Heating, Inc</h4>
                    <p className={'pl-3 text-wrap'}>
                        I began my journey into web development with a redesign of the website for my father's company.
                        The site was not mobile friendly and had an outdated design. <span id={'awards'}/>I brought it up to date cosmetically
                        and reduced the specificity of a few elements to remove the need for constant updates.</p>
                </Col>
            </Row>

            <Row className={"pb-md-3 pt-5 justify-content-around"}>
                <h3>Awards</h3>
            </Row>

            <Row className={"pb-3 py-md-5 d-flex justify-content-around align-content-center flex-row-reverse"}>
                <Col className="col-12 col-md-4 px-0 mx-0 pb-3 pb-md-4">
                    <img className="w-100" src={award} alt="Celebrating Contest Victory"/>
                </Col>
                <Col>
                    <h4 className={'pb-3 pb-md-4 px-4'}>
                        <a href="https://appcontest.unm.edu/2019-2020/winners.html">UNM Mobile App Contest</a>
                    </h4>
                    <p className={'pr-3 text-wrap'}>
                        Timothy Beck and I took the ABQ Veterans project to the 2020 UNM and CNM Mobile App Contest where
                        we took the top spot amongst tough competition. We were told later that our documentation and
                        technical skill was what tipped the scale in our favor.</p>
                </Col>
            </Row>
        </Container>
    )
};