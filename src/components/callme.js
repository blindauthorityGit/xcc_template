import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../client";
import Button_Link from "./button_link.js";

export default function Person(props) {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'call']
                  `
            )
            .then((data) => {
                setPostData(data);
            })
            .catch(console.error);
    }, []);

    return (
        <>
            {postData &&
                postData.map((e, i) => (
                    // eslint-disable-next-line react/jsx-pascal-case
                    <Button_Link
                        href={`tel:${postData[i].phone}`}
                        index={i}
                        e={e}
                        icon="bi bi-telephone"
                        cat="email"
                        data={postData}
                        key={i}
                    ></Button_Link>
                ))}
        </>
    );
}
