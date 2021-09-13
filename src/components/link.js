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
    const [box, setBox] = useState([]);
    const [bg, setBg] = useState({});
    const btnRef = useRef();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'link'] | order(order asc) {
                    display,
                    title,
                    colorlist,
                    "file": file.asset->url,
                    url,
                    box,
                    "hintergrundbild": hintergrundbild.asset->url,
                    showTitle
                  }
                  `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
                console.log(data[0].box);
                btnRef.current.addEventListener("click", createRipple);
                document.querySelector(".loaderWrapper").classList.add("fade-out");
                setTimeout(() => {
                    document.querySelector(".loaderWrapper").style.zIndex = -1;
                }, 1000);

                data.map((e, i) => {
                    console.log(e.hintergrundbild);

                    setBox((oldArray) => [...oldArray, data[i].box]);
                    console.log(box);
                    switch (e.colorlist.title) {
                        case "Rot":
                            btnRef.current.style.color = "white";
                            btnRef.current.children[0].style.color = "white";
                            setBg({
                                background: e.colorlist.value,
                                backgroundImage: "url(" + e.hintergrundbild + ")",
                                color: "white",
                            });

                            break;
                        case "Blau":
                            btnRef.current.style.color = "#adb9c5";
                            btnRef.current.children[0].style.color = "#adb9c5";
                            setBg({
                                background: e.colorlist.value,
                                backgroundImage: "url(" + e.hintergrundbild + ")",
                                color: "#adb9c5",
                            });

                            break;
                        case "Orange":
                            btnRef.current.style.color = "#313131";
                            btnRef.current.children[0].style.color = "#313131";
                            setBg({
                                background: e.colorlist.value,
                                color: "#313131",
                            });
                            break;
                        case "Gruen":
                            btnRef.current.style.color = "#313131";
                            btnRef.current.children[0].style.color = "#313131";
                            setBg({
                                background: e.colorlist.value,
                                color: "#313131",
                            });
                            break;
                        case "Hellgrau":
                            btnRef.current.style.color = "#313131";
                            btnRef.current.children[0].style.color = "#313131";
                            setBg({
                                background: e.colorlist.value,
                                color: "#313131",
                            });
                            break;
                        case "Schwarz":
                            btnRef.current.style.color = "#adb9c5";
                            btnRef.current.children[0].style.color = "#adb9c5";
                            setBg({
                                background: e.colorlist.value,
                                color: "#adb9c5",
                            });
                            break;
                        case "Weiss":
                            btnRef.current.style.color = "313131";
                            btnRef.current.children[0].style.color = "#313131";
                            setBg({
                                background: e.colorlist.value,
                                color: "#313131",
                            });
                            break;
                    }
                    btnRef.current.style.background = e.colorlist.value;
                    btnRef.current.style.background = e.colorlist.value;

                    console.log(box);
                });
            })
            .catch(console.error);
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
                    <div className={`${postData[i].box ? "col-6" : "col-12"} py-2 boxWrapper`}>
                        {postData[i].display === "file" && (
                            <a
                                href={postData[i].file}
                                className="box boxlink p-2 d-flex flex-column justify-content-center align-items-center"
                                data-id={i}
                                data-cat="link"
                                ref={btnRef}
                                style={bg}
                                download
                                target="_blank"
                            >
                                {postData[i].showTitle && (
                                    <span>
                                        <i class="bi bi-link"></i>
                                        <h2>{postData[i].title}</h2>
                                    </span>
                                )}
                                <img src={postData[i].hintergrundbild}></img>
                            </a>
                        )}
                        {postData[i].display === "link" && (
                            <a
                                href={postData[i].url}
                                className="box boxlink p-2 d-flex flex-column justify-content-center align-items-center"
                                data-id={i}
                                data-cat="link"
                                ref={btnRef}
                                style={bg}
                            >
                                {postData[i].showTitle && (
                                    <span>
                                        <i class="bi bi-link"></i>
                                        <h2>{postData[i].title}</h2>
                                    </span>
                                )}

                                <img src={postData[i].hintergrundbild}></img>
                            </a>
                        )}
                    </div>
                ))}
        </>
    );
}
