import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import './css/main.css';
import './css/PersonalWebpage.scss';

import * as serviceWorker from './serviceWorker';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Home} from "./pages/Home/Home";
import {Header} from "./components/Header/Header";
import {ContactMe} from "./pages/ContactMe/ContactMe";
import {Portfolio} from "./pages/Portfolio/Portfolio";
import {Blog} from "./pages/Blog/Blog";
import {Testing} from "./pages/Testing/Testing"
import {combinedReducers} from "./shared/reducers";
import {CreatePost} from "./pages/CreatePost/CreatePost";
import {ViewMessages} from "./pages/viewMessages/ViewMessages";

const store = createStore(combinedReducers, applyMiddleware(thunk));
const Routing = (store) => (
    <>
        <Provider store={store}>
            <BrowserRouter>
                <Container fluid className={"bg-light"}>
                    <Row className={'sticky-top d-flex align-items-center'}>
                        <Col>
                        <Header/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"bg-light"}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
                                <Route exact path='/ContactForm' component={ContactMe}/>
                                <Route exact path='/Portfolio' component={Portfolio}/>
                                <Route exact path='/Testing' component={Testing}/>
                                <Route exact path='/Blog/:postId' component={Blog} postId=':postId'/>
                                <Route exact path='/CreatePost/:parent' component={CreatePost} postId=':parent'/>
                                <Route exact path="/Messages" component={ViewMessages}/>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </Provider>
    </>
);
ReactDOM.render(Routing(store), document.querySelector('#root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
