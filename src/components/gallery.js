import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";
import Button from "./button.js";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";

import { createRipple } from "./controller/rippler.js";

export default function Gallery(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'gallery']
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
                    <Button
                        index={i}
                        e={e}
                        icon="bi bi-images"
                        cat="gallery"
                        data={postData}
                        modal={showModalSwitch}
                    ></Button>
                ))}
        </>
    );
}
