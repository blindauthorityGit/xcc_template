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
                `*[_type == 'person']
                  `
            )
            .then((data) => {
                setPostData(data);
                console.log(data[0]);
            })
            // .then((data) => console.log(data))
            .catch(console.error);
        console.log(postData);

        // document.querySelector("#test").addEventListener("click", showData);
    }, []);

    return (
        <div className="">
            {postData && (
                <div className="socialMedia d-flex  mb-3 mt-4">
                    {postData[0].socialmedia != undefined && (
                        <div className="facebook">
                            {postData[0].socialmedia.facebook && (
                                <a href={postData[0].socialmedia.facebook}>
                                    <i class="bi bi-facebook"></i>
                                </a>
                            )}
                        </div>
                    )}

                    {postData[0].socialmedia != undefined && (
                        <div className="instagram">
                            {postData[0].socialmedia.instagram && (
                                <a href={postData[0].socialmedia.instagram}>
                                    <i class="bi bi-instagram"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {postData[0].socialmedia != undefined && (
                        <div className="whatsapp">
                            {postData[0].socialmedia.whatsapp && (
                                <a href={`https://wa.me/${postData[0].socialmedia.whatsapp}`}>
                                    {console.log(`https://wa.me/${postData[0].socialmedia.whatsapp}`)}
                                    <i class="bi bi-whatsapp"></i>
                                </a>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
