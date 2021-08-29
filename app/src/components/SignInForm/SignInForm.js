import React, {useEffect} from 'react';
import {SignInFormContent} from "./SignInFormContent";
import {httpConfig} from "../../shared/utils/http-config";
import * as Yup from "yup";
import {Formik} from "formik";

/**
 * signInForm validation and API Logic
 *
 * @returns {*} formik Sign In Form
 * @author John Johnson-Rodgers <John@johnthe.dev>
 */


//define signin state variable to utilize in sign-in form
export const SignInForm = () => {
    //start php session
    useEffect(() => {httpConfig.get("/apis/earl-grey/")}, []);

    const signIn = {
        password: ""
    };

    //initiate yup validator
    const validator = Yup.object().shape({
        password: Yup.string()
            .required("Password is required.")
    });

    const submitSignIn = (values, {resetForm, setStatus}) => {
        httpConfig.post("/apis/sign-in/", values)
            .then(reply => {
                let {message, type} = reply;
                if(reply.status === 200 && reply.headers['x-jwt-token']) {
                    window.localStorage.removeItem('jwt-token');
                    window.localStorage.setItem("jwt-token", reply.headers['x-jwt-token']);
                    resetForm();
                    setTimeout(() => {
                        window.location = "/";
                    }, 750);
                } setStatus({message, type})
            })
    };

    return (
        <Formik onSubmit={submitSignIn} initialValues={signIn} validationSchema={validator}>
            {SignInFormContent}
        </Formik>
    )
};