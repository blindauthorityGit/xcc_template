import React, { useState, useEffect } from "react";

import ModalPerson from "./modalContent/modalPerson.js";
import ModalGallery from "./modalContent/modalGallery";
import ModalYoutube from "./modalContent/modalYoutube";
import { useSwipeable } from "react-swipeable";

export default function ModalBox(props) {
    const [animationnu, setAnimationnu] = useState(props.animation);
    const [myId, setMyId] = useState(props.id);
    const [categourie, setCategourie] = useState(props.cat);

    const [swipe, setSwipe] = useState(null);

    const handlers = useSwipeable({
        onSwiped: (eventData) => setSwipe(eventData),
    });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    useEffect(() => {
        console.log(swipe);
        if (swipe === "Up") {
            close();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [swipe]);

    function close() {
        setAnimationnu("slide-out-top");
        setTimeout(() => {
            props.changeState(false);
        }, 300);
        document.querySelector("#overlay").classList.add("fade-out");
    }

    return (
        <div>
            <div className={`${animationnu} container-fluid position-absolute h-80 modalBox`}>
                <div>
                    <div className="closer" id="closer" onClick={() => close()}>
                        <i class="bi bi-caret-left"></i>
                    </div>
                    {categourie === "person" && <ModalPerson id={myId}></ModalPerson>}
                    {categourie === "gallery" && <ModalGallery id={myId}></ModalGallery>}
                    {categourie === "youtube" && <ModalYoutube id={myId}></ModalYoutube>}
                </div>
            </div>
        </div>
    );
}
