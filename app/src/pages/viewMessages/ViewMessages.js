import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonGroup, Col, Container, Modal, Row} from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import {httpConfig} from "../../shared/utils/http-config";
import {getAllMessages} from "../../shared/actions/messages";
import {UseJwt} from "../../shared/utils/JwtHelpers";

export const ViewMessages = ({match}) => {
    let messages = useSelector(state => (state.messages ? state.messages : []));
    const jwtToken = UseJwt();
    const dispatch = useDispatch();
    //set effects and inputs for async calls
    const effects = () => {
        console.log(jwtToken);
        dispatch(getAllMessages(jwtToken), []);
        console.log('ran');
    };
    const handleDeleteMessages = (messageId)=>{
        httpConfig.delete("/apis/message/?messageId=" + messageId, {
            headers: {
                'X-JWT-TOKEN': jwtToken
            }})
            .then(reply => {
                if(reply.status === 200) {
                    window.location.reload();
                }
            });
    }
    useEffect(effects, [jwtToken]);
    return (
        jwtToken!==null?
        <Container>
            <Row className={"py-5 justify-content-around"}>
                <h2>Messages</h2>
            </Row>
            <Row><Col className={'col-8'}>
                <Row className={'border-bottom border border-dark'}>
                    <Col className={'col-2'}>
                        Message Date
                    </Col>
                    <Col>
                        Content
                    </Col>
                    <Col className={'col-1'}><span/></Col>
                </Row>
                {messages && messages.length !== 0 && messages.map(message=>{
                    return(
                <>
                    <Row id={message.messageId}>
                        <Col className={'col-2'}>
                            {message.messageDate}
                        </Col>
                        <Col className={'text-wrap'}>
                            {message.messageContent}
                        </Col>
                        <Col className={'col-1'}>
                            <Button variant='danger' onClick={()=>{handleDeleteMessages(message.messageId)}}>
                                X
                            </Button>
                        </Col>
                    </Row>
                </>)})}
            </Col>
            </Row>
        </Container>:
            <></>
    )
}