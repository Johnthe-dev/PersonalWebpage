import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonGroup, Col, Container, Modal, Row} from "react-bootstrap";
import {getPostByPostId} from "../../shared/actions/post";
import ReactMarkdown from 'react-markdown';
import {httpConfig} from "../../shared/utils/http-config";
import {Link} from "react-router-dom";

export const CreatePost = (postId) => {
    let [postContent, setPostContent] = useState('');
    const getPassword = ()=>{
        return prompt('Please enter password');
    }
    const addLink = ()=>{
        return prompt('Enter the url');
    }
    const handlePost = (title, content)=>{
        let postPassword=window.localStorage.getItem("postPassword");
        if(!postPassword||(postPassword&&postPassword.length===0)){
            postPassword=getPassword();
            window.localStorage.setItem('postPassword', postPassword);
        }
        let data = {
            postId: postId,
            postTitle: title,
            postContent: content,
            postPassword: postPassword
        };
        httpConfig.post("/apis/post/", data)
            .then(reply => {
                if(reply.status === 200) {
                    console.log('success');
                }
            });
    }
    const handleContentChange = (post) =>{
        setPostContent(post);
        console.log(postContent);
    }
    return (
        <Container className={'pb-4'}>
            <Row className={"py-5 justify-content-around"}>
                <h2>Create Post</h2>
            </Row>
            <Row className={"justify-content-around"}>
                <Col className={'col-2'}>
                    <label htmlFor={'postTitleInput'}>Post Title</label>
                </Col>
                <Col>
                    <input type={'text'} className={'form-control'} id={'postTitleInput'} placeholder={'Alligators of Southern Texas'}/>
                </Col>
            </Row>
            <Row className={"pt-3 justify-content-around"}>
                <label className={'h4'} htmlFor={'postContentInput'}>Post Content</label>
            </Row>
            <Row className={"pb-3 justify-content-around"}>
                <ButtonGroup className={'pb-3'} size="lg">
                    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'###');}}>Header</Button>
                    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'**');}}>Bold</Button>
                    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'*');}}>Italic</Button>
                    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'<');}}>Blockquote</Button>
                    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'`');}}>Code</Button>
                    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'\n\n---\n\n');}}>Horizontal Line</Button>
                    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'![linkTitle]('+addLink()+')');}}>Link</Button>
                </ButtonGroup>
                <textarea className={'form-control'} rows={'10'} id={'postContentInput'} value={postContent} onChange={(e)=>{handleContentChange(e.target.value)}}/>
            </Row>
        </Container>
    )
}