import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";

import GalleryController from "../controller/galleryController";

import Carousel from "./carousel";

export default function ModalGallery(props) {
    const [postData, setPostData] = useState(null);
    const [showModalnu, setShowModalnu] = useState(props.show);
    const [animationnu, setAnimationnu] = useState(props.animation);
    const [myId, setMyId] = useState(props.id);
    const [hasImg, sethasImg] = useState(null);
    const [showOverlay, setshowOverlay] = useState(false);
    const [hero, setHero] = useState(null);

    const BlockContent = require("@sanity/block-content-to-react");

    const imageStyle = {};

    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'gallery'] {
                    images,
                    beschreibung
                  }
                  `
            )
            .then((data) => {
                setPostData(data);
                setHero(
                    urlFor(data[myId].images[0])
                        .width(window.innerWidth)
                        .height(Math.floor(window.innerHeight / 3))
                );
                Array.from(document.getElementsByClassName("thumbnail"))[0].children[0].classList.add("activeImg");
                document.querySelector("#galleryInput").style.paddingTop =
                    Math.floor(window.innerHeight / 2.6) + 16 + "px";
                console.log(data[0].images[0].beschreibung);
            })
            .catch(console.error);
    }, []);

    function showData(e) {
        console.log(e.target);
    }

    function setTheHero(e) {
        setHero(
            urlFor(postData[myId].images[e.target.id])
                .width(window.innerWidth)
                .height(Math.floor(window.innerHeight / 3))
        );
        Array.from(document.getElementsByClassName("thumbnail")).map((e) =>
            e.children[0].classList.remove("activeImg")
        );
        e.target.classList.add("activeImg");
        document.querySelector("#heroImage").dataset.id = e.target.id;
    }

    function close() {
        setAnimationnu("slide-out-top");
        setTimeout(() => {
            props.changeState(false);
        }, 200);
    }

    function showFullHero() {
        setshowOverlay(true);
        document.querySelector("#hero").classList.add("zIndex-1");
    }

    function closeHero() {
        setshowOverlay(false);
        document.querySelector("#hero").classList.remove("zIndex-1");
    }

    return (
        <div>
            {/* {showOverlay && (
                <div className="heroFull" id="heroFull">
                    <img
                        src={urlFor(postData[myId].images[document.querySelector("#heroImage").dataset.id])}
                        alt="hero"
                        onClick={closeHero}
                    />
                    <p className="description">
                        {postData[myId].images[document.querySelector("#heroImage").dataset.id].beschreibung}
                    </p>
                </div>
            )}
            {showOverlay && <div className="overlayBlack slide-in-top" id="overlayBlack"></div>}
            {postData && (
                <div className="container">
                    <GalleryController></GalleryController>
                    <div className="heroImg" id="hero">
                        <img id="heroImage" src={hero} data-id="0" onClick={showFullHero} alt="" />
                    </div>
                    <div className="galleryInput" id="galleryInput">
                        <div className="carousel d-flex flex-wrap">
                            {postData[myId].images.map((e, i) => (
                                <div className="thumbnail pe-1 pb-1">
                                    <img
                                        src={urlFor(e).width(90).height(90)}
                                        dataset-id={i}
                                        id={i}
                                        onClick={(image) => {
                                            setTheHero(image);
                                        }}
                                        alt=""
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )} */}
            <Carousel></Carousel>
            {postData && <BlockContent blocks={postData[0].beschreibung}></BlockContent>}
        </div>
    );
}
