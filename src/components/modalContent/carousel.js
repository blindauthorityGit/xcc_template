import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import YouTube from "react-youtube";
import getYouTubeID from "get-youtube-id";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Youtube(props) {
    const [postData, setPostData] = useState(null);
    const [myId, setMyId] = useState(props.id);
    const [showOverlay, setshowOverlay] = useState(false);

    const [url, setUrl] = useState(null);

    const imageStyle = {};

    const builder = imageUrlBuilder(sanityClient);

    const [opts, setOpts] = useState(null);

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'gallery']
          `
            )
            .then((data) => {
                setPostData(data);
                console.log(data);
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
            {postData && (
                <Carousel>
                    {postData[0].images.map((e, i) => (
                        <div key={i}>
                            <img src={urlFor(e)} />
                            <p className="legend">{e.beschreibung}</p>
                        </div>
                    ))}
                </Carousel>
                //     <Carousel>
                //     <div>
                //         <img src="assets/1.jpeg" />
                //         <p className="legend">Legend 1</p>
                //     </div>
                //     <div>
                //         <img src="assets/2.jpeg" />
                //         <p className="legend">Legend 2</p>
                //     </div>
                //     <div>
                //         <img src="assets/3.jpeg" />
                //         <p className="legend">Legend 3</p>
                //     </div>
                // </Carousel>
            )}
        </div>
    );
}
