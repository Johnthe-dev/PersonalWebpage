import React, {useState} from "react";
import {Button,  Col, Container,  Row} from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import {httpConfig} from "../../shared/utils/http-config";

export const CreatePost = ({match}) => {
    const postId=match.params.parent;
    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');
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
                    setTimeout(() => {
                        window.location = "/Blog/" +reply.data
                    }, 500)
                }
            });
    }
    const handleContentChange = (post) =>{
        setPostContent(post);
    }
    const handleTitleChange = (title) =>{
        setPostTitle(title);
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
                    <input type={'text'} className={'form-control'} id={'postTitleInput'} value={postTitle} onChange={(e)=>{handleTitleChange(e.target.value)}}/>
                </Col>
            </Row>
            <Row className={"pt-3 justify-content-around"}>
                <Col className={'col-5'}>
                    <Row className={"pt-3 justify-content-around"}>
                        <label className={'h4'} htmlFor={'postContentInput'}>Post Content</label>
                    </Row>
                    <Row className={"pb-3 justify-content-around"}>
                        {/*<ButtonGroup className={'pb-3'} size="lg">*/}
                        {/*    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'### '); document.getElementById('')}}>Header</Button>*/}
                        {/*    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'**');}}>Bold</Button>*/}
                        {/*    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'*');}}>Italic</Button>*/}
                        {/*    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'`');}}>Code</Button>*/}
                        {/*    <Button className={'btn-outline-secondary bg-light text-dark'} onClick={()=>{handleContentChange(postContent+'![linkTitle]('+addLink()+')');}}>Link</Button>*/}
                        {/*</ButtonGroup>*/}
                        <textarea className={'form-control'} rows={'10'} id={'postContentInput'} value={postContent} onChange={(e)=>{handleContentChange(e.target.value)}}/>
                    </Row>
                </Col>
                <Col className={'col-5'}>
                    <Row className={"pt-3 justify-content-around"}>
                        <label className={'h4'} htmlFor={'postContent'}>Post Preview</label>
                    </Row>
                    <Row>
                        <Col>
                            <Row>
                                <h3>
                                    {postTitle}
                                </h3>
                            </Row>
                                <ReactMarkdown>
                                    {postContent}
                                </ReactMarkdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className={'justify-content-between'}>
                <a href={'https://www.markdownguide.org/basic-syntax/'} target="_blank">View Markdown guide</a>
                <Button variant={'success'} onClick={()=>{handlePost(postTitle, postContent)}}>Create Post</Button>
            </Row>
        </Container>
    )
}