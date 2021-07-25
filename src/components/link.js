import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";

import { createRipple } from "./controller/rippler.js";

export default function Links(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");
    const btnRef = useRef();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'link']{
                    display,
                    title,
                    "file": file.asset->url,
                    url
                  }
                  `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
                btnRef.current.addEventListener("click", createRipple);
            })
            // .then((data) => console.log(data))
            .catch(console.error);

        // document.querySelector("#test").addEventListener("click", showData);
    }, []);

    function showData() {
        console.log(postData);
    }

    function showModalSwitch(i) {
        console.log(btnRef);
        setTimeout(() => {
            setAnimation("slide-in-top");
            setId(i);
            setShowModal(true);
            console.log(showModal);
        }, 200);
    }

    return (
        <div className="row">
            {/* <button onClick={showData}>SHOW ME</button> */}
            {showModal && (
                <div>
                    <ModalBox
                        show={showModal}
                        id={id}
                        cat="youtube"
                        animation={animation}
                        changeState={(state) => setShowModal(state)}
                    ></ModalBox>
                    <Overlay></Overlay>
                </div>
            )}
            {postData &&
                postData.map((e, i) => (
                    <div className="col-12 py-2">
                        {postData[i].display === "file" && (
                            <a
                                href={postData[i].file}
                                className="box boxlink p-2 d-flex flex-column justify-content-center align-items-center"
                                data-id={i}
                                data-cat="link"
                                ref={btnRef}
                                // onClick={() => {
                                //     showModalSwitch(i);
                                // }}
                            >
                                <i class="bi bi-link"></i>
                                <h2>{postData[i].title}</h2>
                            </a>
                        )}
                        {postData[i].display === "link" && (
                            <a
                                href={postData[i].url}
                                className="box boxlink p-2 d-flex flex-column justify-content-center align-items-center"
                                data-id={i}
                                data-cat="link"
                                ref={btnRef}
                                // onClick={() => {
                                //     showModalSwitch(i);
                                // }}
                            >
                                <i class="bi bi-link"></i>
                                <h2>{postData[i].title}</h2>
                            </a>
                        )}
                        {/* {postData[i].display === "link" && <a href={postData[i].url}>LINK</a>} */}
                    </div>
                ))}
        </div>
    );
}
