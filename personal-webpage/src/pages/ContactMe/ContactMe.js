import React, {useState} from "react";
import {Container, Navbar, Nav, Col, Row, Form, Button, FormControl, Image} from "react-bootstrap";

export const ContactMe = () => {
    const [messages, setMessages] = useState([
        {
            'order': 0,
            'message': "Hello! I'll send a message to John for you!",
            'source': 'system'
        }, {
            'order': 1,
            'message': "What would you like to tell him?",
            'source': 'system'
        }
    ]);
    const [message, setMessage] = useState("");
    const [order, setOrder] = useState(2);
    const createMessageHandler = (source, message) => {
        setMessages([...messages, {
            'order': order,
            'message': message,
            'source': source
        }]);
        setOrder(order + 1);
    }
    const newMessageHandler = (source, message) => {
        if (source === 'user') {
            createMessageHandler(source, message);
        } else if (source === 'system'){
        createMessageHandler('system', 'System Message')}
    }
    const changeHandler = (event) => {
        setMessage(event.target.value);
    }
    const userRow = 'px-2 py-3 d-flex justify-content-end';
    const systemRow = 'px-2 py-3';
    return (
        <Col className={'bg-secondary mainBg'}>
            <Row className={'pt-3'}>
                <Col id={'contactForm'}
                     className={'bg-light col-12-sm col-9-md col-6-lg col-3 border border-primary d-flex flex-column-reverse OverflowGone'}>
                    {messages.sort((a, b) => {
                        return b.order - a.order
                    }).map((message) => {
                        return (
                            <Row className={message.source==='user'?userRow:systemRow}>
                                <div className={'py-2 px-2 ' + message.source + 'Message'}>
                                    {message.message}
                                </div>
                            </Row>
                        )
                    })
                    }
                    {/*<Row className={'px-2 py-3'}>*/}
                    {/*    <div className={'py-2 px-2 systemMessage loadingDots'}>*/}
                    {/*        <span className={'loadOne'}/><span className={'loadTwo'}/><span className={'loadThree'}/>*/}
                    {/*    </div>*/}
                    {/*</Row>*/}
                    {/*<Row className={'px-2 py-3 '}>*/}
                    {/*    <div className={'py-2 px-2 systemMessage'}>*/}
                    {/*        That sounds interesting, care to tell me more information?*/}
                    {/*    </div>*/}
                    {/*</Row>*/}
                    {/*<Row className={'px-2 py-3 d-flex justify-content-end'}>*/}
                    {/*    <div className={'py-2 px-2 userMessage'}>*/}
                    {/*        Hello! I was wondering if you'd like to meet up about an opportunity!*/}
                    {/*    </div>*/}
                    {/*</Row>*/}
                    {/*<Row className={'px-2 py-3 '}>*/}
                    {/*    <div className={'py-2 px-2 systemMessage'}>*/}
                    {/*    What would you like to talk about?*/}
                    {/*    </div>*/}
                    {/*</Row>*/}
                    {/*<Row className={'px-2 py-3 '}>*/}
                    {/*    <div className={'py-2 px-2 systemMessage'}>*/}
                    {/*        Hello! I'll send a message to John for you!*/}
                    {/*    </div>*/}
                    {/*</Row>*/}
                    {/*<Row>*/}
                    {/*    <form onSubmit={()=>{newMessageHandler(message)}}>*/}
                    {/*        <Row className={'bg-light py-1 border-bottom border-dark mx-0'}>*/}
                    {/*            <Col><input*/}
                    {/*                className="form-control"*/}
                    {/*                id="message"*/}
                    {/*                type="text"*/}
                    {/*                value={message}*/}
                    {/*                placeholder=""*/}
                    {/*                onChange={changeHandler}*/}
                    {/*            /></Col>*/}
                    {/*        </Row>*/}
                    {/*    </form>*/}
                    {/*</Row>*/}
                </Col>
            </Row>
            <Row className={'pt-3'}>
                <Col id={'contactMessage'} className={'col-12-sm col-9-md col-6-lg col-3'}>
                    <Row>
                        <Col className={'col-8'}>
                            <input
                                className="form-control"
                                id="message"
                                type="text"
                                value={message}
                                placeholder=""
                                onChange={changeHandler}
                            />
                        </Col>
                        <Col className={'col-4'}>
                            <Button variant='success' onClick={() => {
                                newMessageHandler('user', message)
                            }}>Send</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>

    )
};