import React, { useState, useEffect } from "react";
import sanityClient from "../../client";

import imageUrlBuilder from "@sanity/image-url";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

export default function ModalGallery(props) {
    const [postData, setPostData] = useState(null);
    const [myId, setMyId] = useState(props.id);

    const BlockContent = require("@sanity/block-content-to-react");

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
            })
            .catch(console.error);
    }, []);

    return (
        <div>
            {postData && (
                <Carousel>
                    {postData[myId].images.map((e, i) => (
                        <div key={i}>
                            <img src={urlFor(e)} />
                            <p className={e.beschreibung ? "legend" : "d-none"}>{e.beschreibung}</p>
                        </div>
                    ))}
                </Carousel>
            )}
            {postData && <BlockContent blocks={postData[myId].beschreibung}></BlockContent>}
        </div>
    );
}
