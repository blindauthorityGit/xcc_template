import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";

export default function Person(props) {
    const [postData, setPostData] = useState(null);

    const btnRef = useRef();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'call']
                  `
            )
            .then((data) => {
                setPostData(data);
                data.map((e, i) => {
                    console.log(btnRef.current);
                    switch (e.colorlist.title) {
                        case "Rot":
                            btnRef.current.style.color = "white";
                            btnRef.current.children[0].style.color = "white";

                            break;
                        case "Blau":
                            btnRef.current.style.color = "#adb9c5";
                            btnRef.current.children[0].style.color = "#adb9c5";

                            break;
                        case "Orange":
                            btnRef.current.style.color = "#313131";
                            btnRef.current.children[0].style.color = "#313131";
                            break;
                        case "Gruen":
                            btnRef.current.style.color = "#313131";
                            btnRef.current.children[0].style.color = "#313131";
                            break;
                        case "Hellgrau":
                            btnRef.current.style.color = "#313131";
                            btnRef.current.children[0].style.color = "#313131";
                            break;
                        case "Schwarz":
                            btnRef.current.style.color = "#adb9c5";
                            btnRef.current.children[0].style.color = "#adb9c5";
                            break;
                        case "Weiss":
                            btnRef.current.style.color = "313131";
                            btnRef.current.children[0].style.color = "#313131";
                            btnRef.current.children[1].style.color = "#313131";
                            break;
                    }
                    btnRef.current.style.background = e.colorlist.value;
                    btnRef.current.style.borderColor = e.colorlist.value;
                });
            })
            .catch(console.error);
    }, []);

    return (
        <>
            {postData &&
                postData.map((e, i) => (
                    <div className={`${postData[i].box ? "col-6" : "col-12"} py-2 boxWrapper`}>
                        <a
                            href={`tel:${postData[i].phone}`}
                            className="box p-2 d-flex justify-content-center align-items-center"
                            data-id={i}
                            data-cat="call"
                            ref={btnRef}
                        >
                            <i class="bi bi-telephone"></i>

                            <h2>{postData[i].title}</h2>
                        </a>
                    </div>
                ))}
        </>
    );
}
