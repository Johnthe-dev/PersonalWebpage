import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonGroup, Col, Container, Modal, Row} from "react-bootstrap";
import {getPostByPostId} from "../../shared/actions/post";
import ReactMarkdown from 'react-markdown';
import {httpConfig} from "../../shared/utils/http-config";
import {Link} from "react-router-dom";

export const CreatePost = (postId) => {
    const [current, setPostId] = useState('john');
    const getPassword = ()=>{
        return prompt('Please enter password');
    }
    const handlePost = ()=>{
        let postPassword=window.localStorage.getItem("postPassword");
        if(!postPassword||(postPassword&&postPassword.length===0)){
            postPassword=getPassword();
            window.localStorage.setItem('postPassword', postPassword);
        }
        httpConfig.delete("/apis/post/?postId=" + postId + '&postPassword='+ postPassword, {})
            .then(reply => {
                if(reply.status === 200) {
                    handlePostChange('john');
                }
            });
    }
    useEffect(effects, [postId]);
    return (
        <Container>
            <Row className={"py-5 justify-content-around"}>
                <h2>Blog</h2>
                <ButtonGroup size="lg">
                    <Button variant={'warning'} onClick={()=>{handleDelete(postId);}}>Delete</Button>
                    <Button variant={'success'}>Make Child</Button>
                </ButtonGroup>
            </Row>
            <Row className={"justify-content-around"}>
                {data.post&&
                <Col className={'col-9'}>
                    <Row>
                        <h3>
                            {data.post.postTitle}
                        </h3>
                    </Row>
                    <Row>
                        <ReactMarkdown>
                            {data.post.postContent}
                        </ReactMarkdown>
                    </Row>
                </Col>}
                <Col className={'col-2'}>
                    <Row>
                        <h4>
                            Parents
                        </h4>
                        {data.parents&&data.parents.length>0?
                            <ul>
                                {data.parents.map(parent => {
                                    return(
                                        <li><Link className={''} onClick={()=>{handlePostChange(parent.postId)}}>{parent.postTitle}</Link></li>
                                    )})}
                            </ul>
                            :
                            <p> No Parents for this post</p>
                        }
                    </Row>
                    <Row>
                        <h4>
                            Children
                        </h4>
                        {data.children&&data.children.length>0?
                            <ul>
                                {data.children.map(child => {
                                    return(
                                        <li><a onClick={()=>{handlePostChange(child.postId)}}>{child.postTitle}</a></li>
                                    )})}
                            </ul>
                            :
                            <p> No Children for this post</p>
                        }
                    </Row>
                    <Row>
                        <h4>
                            Other Relations
                        </h4>
                        {data.related&&data.related.length >0?
                            <ul>
                                {data.related.map(relation => {
                                    return(
                                        <li><a onClick={()=>{handlePostChange(relation.postId)}}>{relation.postTitle}</a></li>
                                    )})}
                            </ul>
                            :
                            <p> No Other Relations for this post.</p>
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}