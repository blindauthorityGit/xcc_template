import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";

export default function Youtube(props) {
    const [postData, setPostData] = useState(null);
    const [showModalnu, setShowModalnu] = useState(props.show);
    const [animationnu, setAnimationnu] = useState(props.animation);
    const [myId, setMyId] = useState(props.id);
    const [hasImg, sethasImg] = useState(null);
    const [showOverlay, setshowOverlay] = useState(false);

    const [url, setUrl] = useState(null);

    const BlockContent = require("@sanity/block-content-to-react");

    const imageStyle = {};

    const builder = imageUrlBuilder(sanityClient);

    const [opts, setOpts] = useState(null);

    var getYouTubeID = require("get-youtube-id");

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'youtube']
          `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
                setUrl(getYouTubeID(data[myId].url));
                setOpts({
                    height: "390",
                    width: window.innerWidth,
                    playerVars: {
                        // https://developers.google.com/youtube/player_parameters
                        autoplay: 1,
                    },
                });
                console.log(window.innerWidth);
            })
            .catch(console.error);
    }, []);

    function showData(e) {
        console.log(e.target);
    }

    function getID() {
        let URL = postData[myId].url;
        return getYouTubeID(URL);
    }

    return (
        <div>
            {showOverlay && <div className="overlayBlack slide-in-top" id="overlayBlack"></div>}
            {postData && opts && (
                <div className="video">
                    <YouTube videoId={url} opts={opts}></YouTube>
                    <div className="container mt-4">
                        <div className="row">
                            <div className="col">
                                <BlockContent blocks={postData[0].beschreibung}></BlockContent>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
