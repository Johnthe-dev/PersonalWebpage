import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Button, ButtonGroup, Col, Container, Modal, Row} from "react-bootstrap";
import {getPostByPostId} from "../../shared/actions/data";
import ReactMarkdown from 'react-markdown';
import {httpConfig} from "../../shared/utils/http-config";
import {AddRelation} from "../../components/AddRelation/AddRelation";

export const Blog = ({match}) => {
    let data =useSelector(state => (state.data ? state.data : []));
    const dispatch = useDispatch();
    const [postId, setPostId] = useState(match.params.postId);
    //set effects and inputs for async calls
    const effects = () => {
        dispatch(getPostByPostId(postId), [postId]);
    };
    const handlePostChange = (postId)=>{setPostId(postId);}
    const getPassword = ()=>{
        return prompt('Please enter password');
    }
    const handleDeletePosts = (postId)=>{
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
    const handleDeleteRelationships = (firstPost, secondPost)=>{
        let postPassword=window.localStorage.getItem("postPassword");
        if(!postPassword||(postPassword&&postPassword.length===0)){
            postPassword=getPassword();
            window.localStorage.setItem('postPassword', postPassword);
        }
        httpConfig.delete("/apis/relationships/?firstPost=" + firstPost + '&secondPost=' + secondPost +'&postPassword='+ postPassword, {})
            .then(reply => {
                if(reply.status === 200) {
                    window.location = "/Blog/" +firstPost
                }
            });
    }
    useEffect(effects, [postId]);
    return (
        <Container>
            <Row className={"py-5 justify-content-around"}>
                <h2>Blog</h2>
                <ButtonGroup size="lg">
                    <Button variant={'warning'} onClick={()=>{handleDeletePosts(postId);}}>Delete</Button>
                    <Button variant={'success'} href={'/CreatePost/'+postId}>Make Child</Button>
                </ButtonGroup>
            </Row>
            <Row>
                {data.post&&
                <Col className={'col-8'}>
                    <Row>
                        <h3>
                            {data.post.postTitle}
                        </h3>
                    </Row>
                    <ReactMarkdown>
                        {data.post.postContent}
                    </ReactMarkdown>
                </Col>}
                <Col className={'col-3'}>
                    <Row>
                        <h4 className={'pl-2'}>
                            Parents
                        </h4>
                        {data.parents&&data.parents.length>0?
                            <ul>
                                {data.parents.map(parent => {
                                    return(
                                        <li><a id={parent.postId} className={'link'} onClick={()=>{handlePostChange(parent.postId)}}>{parent.postTitle}</a></li>
                                    )})}
                            </ul>
                            :
                            <p className={'pl-3'}> No Parents for this post</p>
                        }
                    </Row>
                    <Row>
                        <h4 className={'pl-2'}>
                            Children
                        </h4>
                        {data.children&&data.children.length>0?
                            <ul>
                                {data.children.map(child => {
                            return(
                                <li><a id={child.postId} className={'link'} onClick={()=>{handlePostChange(child.postId)}}>{child.postTitle}</a></li>
                            )})}
                            </ul>
                            :
                            <p className={'pl-3'}> No Children for this post</p>
                        }
                    </Row>
                    <Row>
                        <h4 className={'pl-2'}>
                            Other Relations
                        </h4>
                        {data.related&&data.related.length >0?
                            <ul>
                                {data.related.map(relation => {
                                    return(
                                        <li><a id={relation.postId} className={'link'} onClick={()=>{handlePostChange(relation.postId)}}>{relation.postTitle}</a><a className={'text-danger pl-2'} onClick={()=>{handleDeleteRelationships(postId, relation.postId)}}>(Delete)</a></li>
                                    )})}
                            </ul>
                            :
                            <p className={'pl-3'}> No Other Relations for this post.</p>
                        }

                        <AddRelation postId={postId} relations={data.related}/>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}