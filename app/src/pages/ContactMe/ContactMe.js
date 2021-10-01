import React, {useState} from "react";
import {Col, Row, Button} from "react-bootstrap";
import {httpConfig} from "../../shared/utils/http-config";
import {UseJwt} from "../../shared/utils/JwtHelpers";

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
    const jwtToken = UseJwt();
    const [show, setShow] = useState('d-none');
    const [contact, setContact] = useState(false);
    const [message, setMessage] = useState("");
    const [order, setOrder] = useState(2);
    const handleSendMessage = ()=>{
        let message= {
            messageContent: messages.reverse().map(e =>e.message).join('<br/>')
        }
        httpConfig.post("/apis/message/", message)
            .then(reply => {
                if(reply.status === 200) {
                    setMessages([{
                        'order': 0,
                        'message': "Message successfully sent!",
                        'source': 'system'
                    }])
                    setTimeout(() => {
                        window.location = "/ContactForm"
                    }, 500)
                } else {
                    setMessages([
                        ...messages, {
                            'order': order,
                            'message': "Some error has occurred.",
                            'source': 'system'
                        }
                    ])
                    setOrder(order+1)
                }
            });
    }
    const phoneRegExp = RegExp(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/);
    const responseGenerator = (source, message) => {
        let response = '';
        let lowerCaseMessage = message.toLowerCase();
        let messageWords = lowerCaseMessage.split(" ");
        if (lowerCaseMessage.includes('send email')){
            handleSendMessage();
        }
        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            response += 'Hello to you too! '
        }
        if (lowerCaseMessage.includes('coffee')) {
            response += 'John generally prefers tea, but he would love to meet up! '
        }
        if (lowerCaseMessage.includes('job') || lowerCaseMessage.includes('opportunity')) {
            response += 'That sounds exciting! Can you tell me a bit more? '
        }
        let i;
        for (i = 0; i < messageWords.length; i++) {
            if (messageWords[i].includes('@')) {
                response += 'I have recorded ' + messageWords[i] + ' as your email address. '
                setContact(true);
            }
            if (phoneRegExp.test(messageWords[i])) {
                response += 'Is ' + messageWords[i] + ' a phone number? And if so, can it receive text messages? '
                setContact(true);
            }
        }
        if (order % 6 === 0) {
            if (contact === true) {
                response += 'I think I might have enough information, please respond with "Send Email" at any time to send this message, otherwise please continue! '
            } else {
                response+= 'Could you please supply me with an email address or phone number so John can get a hold of you? ';
            }
        }
        setMessages([...messages, {
            'order': order,
            'message': message,
            'source': source
        }]);
        if (response !== "") {
            setShow('d-block');
            setTimeout(() => {
                setMessages([...messages, {
                    'order': order,
                    'message': message,
                    'source': source
                }, {
                    'order': order + 1,
                    'message': response,
                    'source': 'system'
                }]);
                setShow('d-none');
            }, 2000);
        }
        setMessage('');
        setOrder(order + 2);
    }
    const changeHandler = (event) => {
        setMessage(event.target.value);
    }
    const userRow = 'px-2 pb-3 d-flex justify-content-end';
    const systemRow = 'px-2 pb-3';
    return (
        <Col className={'bg-secondary mainBg'}>
            <Row className={'pt-3'}>
                <Col id={'contactForm'}
                     className={'bg-light col-sm-8 col-md-6 col-lg-5 col-xl-3 d-flex flex-column-reverse overflowGone'}>
                    <Row className={'border-top border-dark py-4 bg-primary'}>
                        <Col className={'col-8 pr-1'}>
                            <input
                                className="form-control"
                                id="message"
                                type="text"
                                value={message}
                                placeholder=""
                                onChange={changeHandler}
                                onKeyDown={(e) => e.key === 'Enter' && responseGenerator('user', message)}
                            />
                        </Col>
                        <Col className={'col-4'}>
                            <Button variant='success' onClick={() => {
                                responseGenerator('user', message)
                            }}>Send</Button>
                        </Col>
                    </Row>
                    <Row className={'px-2 pb-3 ' + show}>
                        <div className={'py-2 px-2 col-3 systemMessage loadingDots'}>
                            <span className={'loadOne'}/><span className={'loadTwo'}/><span className={'loadThree'}/>
                        </div>
                    </Row>
                    {messages.sort((a, b) => {
                        return b.order - a.order
                    }).map((message) => {
                        return (
                            <Row className={message.source === 'user' ? userRow : systemRow}>
                                <div className={'py-2 px-3 ' + message.source + 'Message'}>
                                    {message.message}
                                </div>
                            </Row>
                        )
                    })
                    }

                </Col>
            </Row>
            {/*<Row className={'pt-3'}>*/}
            {/*    <Col id={'contactMessage'} className={'col-12-sm col-9-md col-6-lg col-3'}>*/}
            {/*        <Row>*/}
            {/*            <Col className={'col-8'}>*/}
            {/*                <input*/}
            {/*                    className="form-control"*/}
            {/*                    id="message"*/}
            {/*                    type="text"*/}
            {/*                    value={message}*/}
            {/*                    placeholder=""*/}
            {/*                    onChange={changeHandler}*/}
            {/*                    onKeyDown={(e) => e.key === 'Enter' && responseGenerator('user', message)}*/}
            {/*                />*/}
            {/*            </Col>*/}
            {/*            <Col className={'col-4'}>*/}
            {/*                <Button variant='success' onClick={() => {*/}
            {/*                    responseGenerator('user', message)*/}
            {/*                }}>Send</Button>*/}
            {/*            </Col>*/}
            {/*        </Row>*/}
            {/*    </Col>*/}
            {/*</Row>*/}
        </Col>

    )
};