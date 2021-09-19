import React, { useState, useEffect } from "react";
import sanityClient from "../client";

export default function Person(props) {
    const [postData, setPostData] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'siteSettings'] {
                    socialmedia_global
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
                <div className="socialMedia d-flex  mb-3 mt-3">
                    {postData[0].socialmedia_global != undefined && (
                        <div className="facebook">
                            {postData[0].socialmedia_global.facebook && (
                                <a href={postData[0].socialmedia_global.facebook}>
                                    <i class="bi bi-facebook"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {/* INSTAGRAM */}
                    {postData[0].socialmedia_global != undefined && (
                        <div className="instagram">
                            {postData[0].socialmedia_global.instagram && (
                                <a href={postData[0].socialmedia_global.instagram}>
                                    <i class="bi bi-instagram"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {/* LINKEDIN */}
                    {postData[0].socialmedia_global != undefined && (
                        <div className="linkedin">
                            {postData[0].socialmedia_global.linkedin && (
                                <a href={postData[0].socialmedia_global.linkedin}>
                                    <i class="bi bi-linkedin"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {/* TWITTER */}
                    {postData[0].socialmedia_global != undefined && (
                        <div className="twitter">
                            {postData[0].socialmedia_global.twitter && (
                                <a href={postData[0].socialmedia_global.twitter}>
                                    <i class="bi bi-twitter"></i>
                                </a>
                            )}
                        </div>
                    )}
                    {/* WHATSAPP */}
                    {postData[0].socialmedia_global != undefined && (
                        <div className="whatsapp">
                            {postData[0].socialmedia_global.whatsapp && (
                                <a href={`https://wa.me/${postData[0].socialmedia_global.whatsapp}`}>
                                    {console.log(`https://wa.me/${postData[0].socialmedia_global.whatsapp}`)}
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
