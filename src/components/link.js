/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";
import ModalBox from "./modal.js";
import Overlay from "./overlay.js";
import { createRipple } from "./controller/rippler.js";
import { color } from "./controller/colors.js";

export default function Links(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState(null);
    const [animation, setAnimation] = useState("");
    const [box, setBox] = useState(null);
    const [bg, setBg] = useState({});
    const btnRef = useRef();

    useEffect(() => {
        console.log(color);
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
                console.log(data, "BUBHUE");
                btnRef.current.addEventListener("click", createRipple);

                data.map((e, i) => {
                    console.log(e.hintergrundbild);

                    console.log(box);
                    // eslint-disable-next-line default-case
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
                            btnRef.current.children[1].style.color = "#313131";
                            btnRef.current.children[2].style.color = "#313131";
                            setBg({
                                background: e.colorlist.value,
                                color: "#313131",
                            });

                            break;
                    }
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
                    <div className={`${postData[i].box ? "col-6" : "col-12"} py-2 `}>
                        {postData[i].display === "file" && (
                            <a
                                href={postData[i].file}
                                className="box boxlink p-2 d-flex flex-column justify-content-center align-items-center"
                                data-id={i}
                                data-cat="link"
                                ref={btnRef}
                                style={{
                                    background: e.colorlist.value,
                                }}
                                download
                                target="_blank"
                                rel="noreferrer"
                            >
                                {postData[i].showTitle && (
                                    <span>
                                        <i class="bi bi-link"></i>
                                        <h2>{postData[i].title}</h2>
                                    </span>
                                )}
                                <img
                                    class={postData[i].hintergrundbild ? "" : "d-none"}
                                    src={postData[i].hintergrundbild}
                                ></img>
                            </a>
                        )}
                        {postData[i].display === "link" && (
                            <a
                                href={postData[i].url}
                                className="box boxlink p-2 d-flex flex-column justify-content-center align-items-center"
                                data-id={i}
                                data-cat="link"
                                ref={btnRef}
                                style={{
                                    background: e.colorlist.value,
                                }}
                            >
                                {postData[i].showTitle && (
                                    <>
                                        <i class="bi bi-link"></i>
                                        <h2>{postData[i].title}</h2>
                                    </>
                                    // eslint-disable-next-line react/jsx-no-comment-textnodes
                                )}
                                <img
                                    class={postData[i].hintergrundbild ? "" : "d-none"}
                                    src={postData[i].hintergrundbild}
                                ></img>
                            </a>
                        )}
                        {box && console.log(box, "neihei")}
                    </div>
                ))}
        </>
    );
}
