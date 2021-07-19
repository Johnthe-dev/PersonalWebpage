import {Dropdown, Row, Col} from "react-bootstrap";
import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getPostByPostContentAndTitle} from "../../shared/actions/post";

export const PostSearch = () => {
    let posts =useSelector(state => (state.post ? state.post : []));
    const dispatch = useDispatch();
    const [searchTerms, setSearchTerms] = useState('');
    //set effects and inputs for async calls
    const effects = () => {
        dispatch(getPostByPostContentAndTitle(searchTerms), [searchTerms]);
    };
    const handleSetSearchTerms = (searchTerms)=>{
        setSearchTerms(searchTerms);
    }
    useEffect(effects, [searchTerms]);
    return (

        <Col>
            <Row className={'justify-content-lg-end'}>
                <Col className={'pl-0 col-12 col-md-2 col-lg text-lg-right'}>
                    <label htmlFor={'searchTerms'}>Search Posts:</label>
                </Col>
                <Col className={'col-12 col-md-6'}>
                    <input type={'text'} className={'form-control'} id={'searchTerms'} value={searchTerms} onChange={(e)=>{handleSetSearchTerms(e.target.value)}}/>
                </Col>
            </Row>
            <Dropdown.Menu className={'dropdown-menu-right'} show={searchTerms!==''}>
                {posts.length!==0?posts.map(post=>{
                    return(
                    <Dropdown.Item id={post.postId} onClick={()=>{window.location = "/Blog/"+post.postId}}>{post.postTitle}</Dropdown.Item>
                    )}):<Dropdown.Item disabled>No Matching Posts</Dropdown.Item>
                }
            </Dropdown.Menu>
            {/*<Button variant="outline-primary">Search</Button>*/}
        </Col>
    )
}