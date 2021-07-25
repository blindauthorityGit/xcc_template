import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Logo from "../img/xcc_logo_white.svg";

export default function Sponsored() {
    const [postData, setPostData] = useState(null);

    useEffect(() => {}, []);

    return (
        <div className="sponsored row">
            <div className="col d-flex align-items-center justify-content-center flex-column mt-4 mb-5">
                <div className="logoText mb-2">Sponsored by </div> <img className="sponsoredImg" src={Logo} alt="" />
            </div>
        </div>
    );
}
