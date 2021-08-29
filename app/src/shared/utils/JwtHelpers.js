import {useState, useEffect} from "react";

/*
* Hooks to grab the JWT Token and decode its data for logged in users.
*/

export const UseJwt = () => {
    const [jwt, setJwt] = useState(null);
    useEffect(() => {
        const token = window.localStorage.getItem("jwt-token");
        if(token !== null) {
            const item = JSON.parse(token);
            // compare the expiry time of the item with the current time
            setJwt(item.value);
        }
    }, [jwt]);
    return jwt;
};