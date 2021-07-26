import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

import Logo from "../img/xcc_logo_white.svg";

export default function Sponsored() {
    const [postData, setPostData] = useState(null);
    const btnRef = useRef();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'siteSettings']

                  `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
                if (data[0].colorlist.value == "white") {
                    console.log(btnRef.current.children[0]);
                    btnRef.current.children[0].style.color = "black";
                    btnRef.current.children[1].style.filter = "invert(1)";
                }
            })
            .catch(console.error);
    }, []);

    return (
        <div className="sponsored row">
            <div className="col d-flex align-items-center justify-content-center flex-column mt-4 mb-5" ref={btnRef}>
                <div className="logoText mb-2">Sponsored by </div> <img className="sponsoredImg" src={Logo} alt="" />
            </div>
        </div>
    );
}
