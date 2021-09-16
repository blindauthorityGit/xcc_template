import React, { useState, useEffect } from "react";
import sanityClient from "../client";

export default function Person(props) {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person'] {
                    socialmedia
                  }                  
                  `
            )
            .then((data) => {
                setPostData(data);
            })
            .catch(console.error);
    }, []);

    return (
        <div className="">
            {postData && (
                // FACEBOOK
                <div className="socialMedia d-flex  mb-3 mt-4">
                    {postData[props.id].socialmedia != undefined && (
                        <div className="facebook">
                            {postData[props.id].socialmedia.facebook && (
                                <a href={postData[props.id].socialmedia.facebook}>
                                    <i class="bi bi-facebook"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {/* INSTAGRAM */}
                    {postData[props.id].socialmedia != undefined && (
                        <div className="instagram">
                            {postData[props.id].socialmedia.instagram && (
                                <a href={postData[props.id].socialmedia.instagram}>
                                    <i class="bi bi-instagram"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {/* LINKEDIN */}
                    {postData[props.id].socialmedia != undefined && (
                        <div className="linkedin">
                            {postData[props.id].socialmedia.linkedin && (
                                <a href={postData[props.id].socialmedia.linkedin}>
                                    <i class="bi bi-linkedin"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {/* TWITTER */}
                    {postData[props.id].socialmedia != undefined && (
                        <div className="twitter">
                            {postData[props.id].socialmedia.twitter && (
                                <a href={postData[props.id].socialmedia.twitter}>
                                    <i class="bi bi-twitter"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {/* WHATSAPP */}
                    {postData[props.id].socialmedia != undefined && (
                        <div className="whatsapp">
                            {postData[props.id].socialmedia.whatsapp && (
                                <a href={`https://wa.me/${postData[props.id].socialmedia.whatsapp}`}>
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
