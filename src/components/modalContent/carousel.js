import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function Youtube(props) {
    const [postData, setPostData] = useState(null);
    const [showOverlay, setshowOverlay] = useState(false);

    const builder = imageUrlBuilder(sanityClient);

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
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            {showOverlay && <div className="overlayBlack slide-in-top" id="overlayBlack"></div>}
            {postData && (
                <Carousel>
                    {postData[0].images.map((e, i) => (
                        <div key={i}>
                            <img src={urlFor(e)} />
                            <p className={e.beschreibung ? "legend" : "d-none"}>{e.beschreibung}</p>
                        </div>
                    ))}
                </Carousel>
            )}
        </div>
    );
}
