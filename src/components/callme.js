import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";

export default function Person(props) {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'call']
                  `
            )
            .then((data) => {
                setPostData(data);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="row">
            {postData &&
                postData.map((e, i) => (
                    <div className="col-12 py-2">
                        <a
                            href={`tel:${postData[i].phone}`}
                            className="box p-2 d-flex justify-content-center align-items-center cta"
                            data-id={i}
                            data-cat="call"
                        >
                            <i class="bi bi-telephone"></i>

                            <h2>{postData[i].title}</h2>
                        </a>
                    </div>
                ))}
        </div>
    );
}
