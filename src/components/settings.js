import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../client";
import imageUrlBuilder from "@sanity/image-url";

import ModalBox from "./modal.js";
import Overlay from "./overlay.js";
import Socialmedia from "./socialmedia.js";

export default function Settings(props) {
    const [postData, setPostData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const BlockContent = require("@sanity/block-content-to-react");
    const [showOverlay, setshowOverlay] = useState(false);
    const landingBg = useRef();

    const builder = imageUrlBuilder(sanityClient);

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type in  ['siteSettings','person']]

                  `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
                landingBg.current.style.backgroundImage = "url(" + urlFor(data[1].backgroundUpload) + ")";
                document.body.style.background = data[1].colorlist.value;
            })
            .catch(console.error);
    }, []);

    function imageBigger(e) {
        console.log(e.target.parentElement.children[0]);
        let container = e.target.parentElement;
        container.style.position = "absolute";
        container.style.width = "10rem";
        container.style.height = "10rem";
        container.style.top = "10%";
        container.style.left = "0";
        container.style.right = "0";
        container.style.margin = "auto";
        container.children[0].style.borderRadius = "0";
        console.log(e);
        e.target.style.width = "100%";
        e.target.style.height = "100%";
        setshowOverlay(true);
    }

    function imageSmaller(e) {
        console.log(e.target.parentElement.children[0]);
        let container = e.target.parentElement;
        container.style.position = "relative";
        container.style.width = "100%";
        container.style.height = "auto";
        container.style.top = "0";
        // container.style.marginBottom = "6rem";
        container.style.marginTop = "6rem";
        e.target.style.width = "auto";
        e.target.style.height = "auto";
        container.children[0].style.borderRadius = "20px";
        setshowOverlay(false);
    }

    return (
        <div className="row white">
            {showOverlay && <div className="overlayBlack slide-in-top" id="overlayBlack"></div>}
            {postData && (
                <span>
                    <div className="socialMediaWrapper" id="socialMediaWrapper">
                        <Socialmedia></Socialmedia>
                    </div>
                    <div className="col-12 px-4">
                        {postData[1].logoPlacement == "center" && (
                            <div className="logoWrapper d-flex justify-content-center">
                                {showOverlay ? (
                                    <img
                                        onClick={(e) => {
                                            imageSmaller(e);
                                        }}
                                        src={urlFor(postData[1].logoUpload)}
                                        alt=""
                                    />
                                ) : (
                                    <img
                                        onClick={(e) => {
                                            imageBigger(e);
                                        }}
                                        src={urlFor(postData[1].logoUpload).width(120).height(120)}
                                        alt=""
                                    />
                                )}
                            </div>
                        )}
                        {/* {postData[0].logoPlacment == "center" && !showOverlay && (
                            <div className="logoWrapper d-flex justify-content-center">
                                <img src={urlFor(postData[0].logo).width(120).height(120)} alt="" />
                            </div>
                        )} */}
                        {postData[1].logoPlacement == "left" && (
                            <div className="logoWrapper d-flex">
                                <img src={urlFor(postData[1].logoUpload).width(120).height(120)} alt="" />
                            </div>
                        )}
                        {postData[1].logoPlacement == "right" && (
                            <div className="logoWrapper d-flex justify-content-end">
                                <img src={urlFor(postData[1].logoUpload).width(120).height(120)} alt="" />
                            </div>
                        )}
                        <div ref={landingBg} className="landingBg" id="landingBg"></div>
                        <h1 className="mt-3">{postData[1].headline}</h1>
                        <div className="mt-3 mb-5 block">
                            <BlockContent blocks={postData[1].richtext}></BlockContent>
                        </div>
                        {/* <hr /> */}
                    </div>
                </span>
            )}
        </div>
    );
}
