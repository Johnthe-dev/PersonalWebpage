import React, {useState} from "react";
import {Button,  Col, Container,  Row} from "react-bootstrap";
import ReactMarkdown from 'react-markdown';
import {httpConfig} from "../../shared/utils/http-config";
import {UseJwt} from "../../shared/utils/JwtHelpers";

export const EditPost = () => {
    const postId = window.localStorage.getItem("editPostId");
    const [postContent, setPostContent] = useState(window.localStorage.getItem("editPostContent"));
    const [postTitle, setPostTitle] = useState(window.localStorage.getItem("editPostTitle"));
    const jwtToken = UseJwt();
    const editPost = ()=>{
        let data = {
            postId: postId,
            postTitle: postTitle,
            postContent: postContent
        };
        httpConfig.put("/apis/post/?postId="+postId, data, {
            headers: {
                'X-JWT-TOKEN': jwtToken
            }})
            .then(reply => {
                if(reply.status === 200) {
                    setTimeout(() => {
                        window.location = "/Blog/" +postId;
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
                <h2>Edit Post</h2>
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
                <Col className={'col-12 col-lg-5'}>
                    <Row className={"pt-3 justify-content-around"}>
                        <label className={'h4'} htmlFor={'postContentInput'}>Post Content</label>
                    </Row>
                    <Row className={"pb-3 justify-content-around"}>
                        <textarea className={'form-control'} rows={'10'} id={'postContentInput'} value={postContent} onChange={(e)=>{handleContentChange(e.target.value)}}/>
                    </Row>
                </Col>
                <Col className={'col-12 col-lg-5'}>
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
                <Button variant={'success'} onClick={()=>{editPost()}}>Recreate Post</Button>
            </Row>
        </Container>
    )
}