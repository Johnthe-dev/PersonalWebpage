import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Col, Container, Row} from "react-bootstrap";
import {getPostByPostId} from "../../shared/actions/post";
import ReactMarkdown from 'react-markdown';

export const Blog = () => {
    let data =useSelector(state => (state.post ? state.post : []));
    const dispatch = useDispatch();
    const [postId, setPostId] = useState('john');
    //set effects and inputs for async calls
    console.log(data);
    const effects = () => {
        dispatch(getPostByPostId(postId), [postId]);
    };
    useEffect(effects, [postId]);
    return (
        <Container>
            <Row className={"py-5 justify-content-around"}>
                <h2>Blog</h2>
            </Row>
            {data.post&&
            <>
                <h3>
                    {data.post.postTitle}
                </h3>
                <Row>
                    <ReactMarkdown>
                    {data.post.postContent}
                    </ReactMarkdown>
                </Row>
            </>}
        </Container>
    )
}