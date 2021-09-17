import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";
import { createRipple } from "./controller/rippler.js";
import Button from "./button";

export default function Person(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [vorname, setVorname] = useState(null);
    const [nachname, setNachname] = useState(null);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person']
                  `
            )
            .then((data) => {
                setPostData(data);
            })
            .catch(console.error);
    }, []);

    function showModalSwitch(i) {
        createRipple(i);
        setTimeout(() => {
            setAnimation("slide-in-top");
            setVorname(postData[Number(i.target.dataset.id)].vorname);
            setNachname(postData[Number(i.target.dataset.id)].nachname);
            setId(Number(i.target.dataset.id));
            setShowModal(true);
        }, 200);
    }

    return (
        <>
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
                    <Overlay></Overlay>
                </div>
            )}
            {postData &&
                postData.map((e, i) => (
                    <Button
                        index={i}
                        e={e}
                        icon="bi bi-person-circle"
                        cat="person"
                        data={postData}
                        modal={showModalSwitch}
                    ></Button>
                    // <div
                    //     className={`${postData[i].button_settings.box ? "col-6" : "col-12"} py-2 ${
                    //         i % 2 === 0 ? "slide-in-left" : "slide-in-right"
                    //     } `}
                    // >
                    //     <div
                    //         className={`${
                    //             e.button_settings.colorlist.title === "Blau" ||
                    //             e.button_settings.colorlist.title === "Schwarz" ||
                    //             e.button_settings.colorlist.title === "Rot"
                    //                 ? "bright-text"
                    //                 : "dark-text"
                    //         } ${
                    //             e.button_settings.border ? "border-button" : ""
                    //         } box p-2 d-flex justify-content-center align-items-center`}
                    //         data-id={i}
                    //         data-cat="person"
                    //         ref={btnRef}
                    //         style={{
                    //             background: e.button_settings.colorlist.value,
                    //         }}
                    //         onClick={(e) => {
                    //             createRipple(e);
                    //             showModalSwitch(i);
                    //         }}
                    //     >
                    //         {e.button_settings.icon && <i class="bi bi-person-circle"></i>}

                    //         <h2>{postData[i].button_settings.titel}</h2>
                    //     </div>
                    // </div>
                ))}
        </>
    );
}
