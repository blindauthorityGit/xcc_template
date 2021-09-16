import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";

import { createRipple } from "./controller/rippler.js";

export default function Gallery(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");

    const btnRef = useRef();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'gallery']
                  `
            )
            .then((data) => {
                setPostData(data);
                console.log(data, "GALERIE");
                btnRef.current.addEventListener("click", createRipple);
                data.map((e, i) => {
                    console.log(btnRef.current.children[0].style.color);
                });
            })
            // .then((data) => console.log(data))
            .catch(console.error);
        console.log(postData);

        // document.querySelector("#test").addEventListener("click", showData);
    }, []);

    function showData(e) {
        console.log(e);
    }

    function showModalSwitch(i) {
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
                        cat="gallery"
                        animation={animation}
                        changeState={(state) => setShowModal(state)}
                    ></ModalBox>
                    <Overlay></Overlay>
                </div>
            )}
            {postData &&
                postData.map((e, i) => (
                    <div
                        className={`${postData[i].button_settings.box ? "col-6" : "col-12"} py-2 ${
                            i % 2 === 0 ? "slide-in-left" : "slide-in-right"
                        } `}
                    >
                        <div
                            className={`${
                                e.button_settings.colorlist.title === "Blau" ||
                                e.button_settings.colorlist.title === "Schwarz" ||
                                e.button_settings.colorlist.title === "Rot"
                                    ? "bright-text"
                                    : "dark-text"
                            } ${
                                e.button_settings.border ? "border-button" : ""
                            } box p-2 d-flex justify-content-center align-items-center`}
                            data-id={i}
                            data-cat="gallery"
                            key={i}
                            style={{
                                background: e.button_settings.colorlist.value,
                            }}
                            onClick={(e) => {
                                createRipple(e);
                                showModalSwitch(i);
                            }}
                        >
                            <i class="bi bi-images"></i>
                            <h2>{postData[i].button_settings.titel}</h2>
                        </div>
                    </div>
                ))}
        </>
    );
}
