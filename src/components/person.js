import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";

export default function Person(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [vorname, setVorname] = useState(null);
    const [nachname, setNachname] = useState(null);
    const [id, setId] = useState(null);
    const [kat, setKat] = useState(null);
    const [animation, setAnimation] = useState("");

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person'] {
                    vorname,
                    nachname,
                    position
                  }
                  `
            )
            .then((data) => setPostData(data))
            // .then((data) => console.log(data))
            .catch(console.error);
        console.log(postData);

        // document.querySelector("#test").addEventListener("click", showData);
    }, []);

    function showData() {
        console.log(postData);
    }

    function checkClass() {}

    function vornameSetter(i) {
        setVorname(postData[i].vorname);
        setShowModal(true);
    }

    function showModalSwitch(i) {
        setAnimation("slide-in-top");
        setVorname(postData[i].vorname);
        setNachname(postData[i].nachname);
        setId(i);
        setShowModal(true);
        console.log(showModal);
    }

    return (
        <div className="row">
            <button onClick={showData}>SHOW ME</button>
            {showModal && (
                <div>
                <ModalBox
                    show={showModal}
                    vorname={vorname}
                    nachname={nachname}
                    id={id}
                    cat="person"
                    animation={animation}
                    changeState={(state) => setShowModal(state)}
                ></ModalBox>
                <Overlay></Overlay></div>
            )}
            {postData &&
                postData.map((e, i) => (
                    <div className="col-6 px-4 py-4">
                        <div
                            className="box p-2 d-flex flex-column justify-content-center align-items-center"
                            data-id={i}
                            data-cat="person"
                            onClick={() => {
                                showModalSwitch(i);
                            }}
                        >
                            <i class="bi bi-person-bounding-box"></i>

                            <h2>{postData[i].vorname}</h2>
                        </div>
                    </div>
                ))}
        </div>
    );
}
