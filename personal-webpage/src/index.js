import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {Provider} from 'react-redux';
import './css/main.css';
import './css/PersonalWebpage.scss';
import icon from './images/icon.svg';

import * as serviceWorker from './serviceWorker';
import {Container} from "react-bootstrap";
import {Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Home} from "./pages/Home/Home";

const store = createStore(applyMiddleware(thunk));
const Routing = (store) => (
    <>
        <Provider store={store}>
            <BrowserRouter>
                <Container fluid className={"bg-light"}>
                    <Row className={'sticky-top'}>
                        {/*<Header/>*/}
                    </Row>
                    <Row>
                        <Col  md={12} lg={10} id="page-content-wrapper" className={"bg-light"}>
                            <Switch>
                                <Route exact path="/" component={Home}/>
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
serviceWorker.register();
