import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";

import ModalPerson from "./modalContent/modalPerson.js";

export default function ModalBox(props) {
    const [postData, setPostData] = useState(null);
    const [showModalnu, setShowModalnu] = useState(props.show);
    const [animationnu, setAnimationnu] = useState(props.animation);
    const [myId, setMyId] = useState(props.id);
    const [categourie, setCategourie] = useState(props.cat);

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

    function close() {
        setAnimationnu("slide-out-top");
        setTimeout(() => {
            props.changeState(false);
        }, 400);
        // setShowModalnu(false);
    }

    return (
        <div>
            <div className={`${animationnu} container-fluid position-absolute h-80 modalBox`}>
                <div className="">
                    <div className="closer" id="closer" onClick={() => close()}>
                        <i class="bi bi-caret-left"></i>
                    </div>
                    {categourie == "person" && <ModalPerson id={myId}></ModalPerson>}
                    {/* <h2>HALLO</h2>
                    <h2>
                        {props.vorname} {props.nachname}
                        {props.id}
                        {postData && console.log(postData[myId])}
                    </h2> */}
                </div>
            </div>
        </div>
    );
}
