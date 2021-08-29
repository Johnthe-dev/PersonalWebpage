import React from "react";

/**
 * @param props properties of inputs
 * @returns {*} fields for the signInForm
 * @author John Johnson-Rodgers <John@johnthe.dev>
 */

export const SignInFormContent = (props) => {
    const {
        status,
        values,
        dirty,
        touched,
        errors,
        handleReset,
        handleChange,
        handleBlur,
        handleClose,
        handleSubmit
    } = props;

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/*Password Field*/}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <div className="input-group">
                        <div className="input-group">
                            <input
                                className="form-control"
                                id="password"
                                type="password"
                                value={values.password}
                                placeholder="Enter Password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </div>
                        {
                            errors.password && touched.password &&(
                                <div className="alert alert-danger">
                                    {errors.password}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="form-group d-flex justify-content-center">
                    <button className="btn btn-primary mb-2 mx-4" type="submit" onClick={handleClose}>Submit</button>

                    <button
                        className="btn btn-secondary mb-2 mx-4"
                        onClick={handleReset}
                        disabled={!dirty}
                    >Reset
                    </button>
                </div>
            </form>
            {status && (<div className={status.type}>{status.message}</div>)}
        </>
    )
};