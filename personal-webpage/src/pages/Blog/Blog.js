import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container, Row} from "react-bootstrap";
import {getAllPosts} from "../../shared/actions/post";
import {httpConfig} from "../../shared/utils/http-config";

export const Blog = () => {
    let blogs =useSelector(state => (state.blog ? state.blog : []));
    const dispatch = useDispatch();
    //set effects and inputs for async calls
    const effects = () => {
        dispatch(getAllPosts(), []);
    };
    httpConfig.get(`/apis/post/`)
        .then(reply => {
            console.log(reply);
        })
    console.log(blogs);
    useEffect(effects);
    return (
        <Container>
            <Row className={"py-5 justify-content-around"}>
                <h2>Blog</h2>
            </Row>
        </Container>
    )
};