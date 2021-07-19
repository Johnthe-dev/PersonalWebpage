import {Row, Col, Button, Modal} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostByPostContentAndTitle} from "../../shared/actions/post";
import {httpConfig} from "../../shared/utils/http-config";

export const AddRelation = (params) => {
    let targetPostId = params.postId;
    let currentRelations = params.relations;
    let posts =useSelector(state => (state.post ? state.post : []));
    const dispatch = useDispatch();
    const [relateTerms, setRelateTerms] = useState('');
    const [show, setShow] = useState(false);
    //set effects and inputs for async calls
    const effects = () => {
        dispatch(getPostByPostContentAndTitle(relateTerms), [relateTerms]);
    };
    const getPassword = ()=>{
        return prompt('Please enter password');
    }
    const handleCreateRelation= (relatedPostId)=>{
        let postPassword=window.localStorage.getItem("postPassword");
        if(!postPassword||(postPassword&&postPassword.length===0)){
            postPassword=getPassword();
            window.localStorage.setItem('postPassword', postPassword);
        }
        let data= {
            firstPost: targetPostId,
            secondPost: relatedPostId,
            postPassword:postPassword
        }
        httpConfig.post("/apis/relationships/", data)
            .then(reply => {
                if(reply.status === 200) {
                    setTimeout(() => {
                        window.location = "/Blog/" +targetPostId
                    }, 500)
                }
            });
    }
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSetRelateTerms = (relateTerms)=>{
        setRelateTerms(relateTerms);
    }
    useEffect(effects, [relateTerms]);
    console.log(currentRelations);
    posts=posts.filter(post=>post.postId!==targetPostId&&(currentRelations?!currentRelations.some(relation=>(relation.postId === post.postId)):true))
    return (
        <>
        <Button variant="primary" className={'ml-3'} onClick={handleShow}>
            Add Relation
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Find Relationship</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Col>
                    <Row className={'justify-content-start pb-3 mb-3 border-bottom'}>

                            <label htmlFor={'relateTerms'}>Search Posts:</label>

                        <Col className={'col-12 col-md-8'}>
                            <input type={'text'} className={'form-control'} id={'relateTerms'} value={relateTerms} onChange={(e)=>{handleSetRelateTerms(e.target.value)}}/>
                        </Col>
                    </Row>

                        {posts.length!==0?posts.slice(0,5).map(post=>{
                            return(
                                <ul><a id={post.postId} onClick={()=>{handleCreateRelation(post.postId)}}>{post.postTitle}</a></ul>
                            )}):<ul>No Matching Posts</ul>
                        }

                {/*<Button variant="outline-primary">Search</Button>*/}
                </Col>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleClose}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    )
}