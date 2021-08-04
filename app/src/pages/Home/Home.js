import React from "react";
import {Container, Col, Row} from "react-bootstrap";
import headshot from '../../images/john.png';

export const Home = () => {
    window.localStorage.setItem('postPassword', '');
    return (
            <Container>
                <Row className={"py-5 mr-0 justify-content-around"}>
                    <h2>Solve quotidian problems with code.</h2>
                </Row>
                <Row className={"mr-0 d-flex align-items-center justify-content-around pb-5"}>
                    <Col className={'col-7 text-center'}>
                        <img id={'johnPicture'} alt={'Picture of John'} src={headshot}/>
                    </Col>

                    <Col className={'col-5 text-left'}>
                        <p>
                            I am John Johnson-Rodgers, a full stack web
                            application developer based in Albuquerque,
                            New Mexico. I invite you to head to the Blog
                            to view little useful facts and resources that
                            help me with my day to day. If you would like
                            to learn about the technologies I am familiar
                            with and projects I have worked on, visit the
                            portfolio page. If you want to contact me
                            please feel free to use the contact me form.
                            I will get back to you as soon as I can.
                        </p>
                    </Col>
                </Row>
            </Container>
    )
};