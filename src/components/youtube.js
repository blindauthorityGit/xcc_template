import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";

import { createRipple } from "./controller/rippler.js";

export default function Youtube(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");
    const btnRef = useRef();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'youtube']
                  `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
                btnRef.current.addEventListener("click", createRipple);
                data.map((e, i) => {
                    console.log(btnRef.current.children[0].style.color);
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
                            break;
                    }
                    btnRef.current.style.background = e.colorlist.value;
                });
            })
            // .then((data) => console.log(data))
            .catch(console.error);
        console.log(postData);

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
        <>
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
                        <div
                            className="box p-2 d-flex flex-column justify-content-center align-items-center"
                            data-id={i}
                            data-cat="youtube"
                            ref={btnRef}
                            onClick={() => {
                                showModalSwitch(i);
                            }}
                        >
                            <i class="bi bi-film"></i>
                            <h2>{postData[i].titel}</h2>
                        </div>
                    </div>
                ))}
        </>
    );
}
