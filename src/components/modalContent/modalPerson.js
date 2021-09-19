import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import VCFGenerator from "../vcf/vcf-generator";
import defaultPerson from "../../assets/imgs/person-fill.svg";
import Map from "../controller/maps.js";

export default function ModalBox(props) {
    const [postData, setPostData] = useState(null);
    const [showOverlay, setshowOverlay] = useState(false);
    const builder = imageUrlBuilder(sanityClient);
    const imgRef = useRef();

    function urlFor(source) {
        return builder.image(source);
    }

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person'] {
                    vorname,
                    nachname,
                    position,
                    icon,
                    adresse,
                      poster,
                    kontakt,
                    socialmedia
                  }
                  `
            )
            .then((data) => {
                setPostData(data);
            })
            .catch(console.error);
        return () => {
            console.log("unmounted");
        };
    }, []);

    function imageBigger(e) {
        let container = e.target.parentElement;
        container.classList.remove("scale-in-center");
        container.style.width = "85vw";
        container.style.height = "60vh";
        container.style.top = "-8%";
        container.children[0].style.borderRadius = "0";
        setshowOverlay(true);
    }

    function imageSmaller(e) {
        let container = e.target.parentElement;
        container.style.width = "8rem";
        container.style.height = "8rem";
        container.children[0].style.borderRadius = "50%";
        setshowOverlay(false);
    }

    return (
        <div>
            {showOverlay && <div className="overlayBlack slide-in-top" id="overlayBlack"></div>}
            {postData && (
                <div className="container">
                    <div className="d-flex justify-content-center scale-in-center" id="portrait">
                        {!postData[props.id].poster && (
                            <img
                                src={defaultPerson}
                                ref={imgRef}
                                onClick={(e) => {
                                    imageSmaller(e);
                                }}
                                alt="Profilbild"
                            />
                        )}

                        {postData[props.id].poster &&
                            (showOverlay ? (
                                <img
                                    src={urlFor(postData[props.id].poster)}
                                    ref={imgRef}
                                    onClick={(e) => {
                                        imageSmaller(e);
                                    }}
                                    alt="Profilbild"
                                />
                            ) : (
                                <img
                                    src={urlFor(postData[props.id].poster)}
                                    ref={imgRef}
                                    onClick={(e) => {
                                        imageBigger(e);
                                    }}
                                    alt="Profilbild"
                                />
                            ))}
                    </div>
                    <div className="mainText text-center mt-5 scale-in-ver-top">
                        <h3 className="pt-5">
                            {postData[props.id].vorname} {postData[props.id].nachname}
                        </h3>
                        <h4>{postData[props.id].position} </h4>
                    </div>
                    {/* FACEBOOK */}
                    <div className="socialMedia d-flex  mb-3 mt-4 scale-in-ver-top">
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

                    <hr />

                    <div className="kontakt text-center slide-in-left">
                        {postData[props.id].kontakt != undefined && (
                            <div className="email">
                                {postData[props.id].kontakt.email && <span>{postData[props.id].kontakt.email}</span>}
                            </div>
                        )}

                        {postData[props.id].kontakt != undefined && (
                            <div className="telefon">
                                {postData[props.id].kontakt.telefon && (
                                    <span>{postData[props.id].kontakt.telefon}</span>
                                )}
                            </div>
                        )}

                        {postData[props.id].kontakt != undefined && (
                            <div className="website">
                                {postData[props.id].kontakt.website && (
                                    <a className="profile_link" href={postData[props.id].kontakt.website}>
                                        {postData[props.id].kontakt.website}
                                    </a>
                                )}
                            </div>
                        )}
                    </div>

                    <div className="adresse text-center slide-in-right">
                        <br />
                        <div className="right">
                            {postData[props.id].adresse != undefined && (
                                <div className="strasse">
                                    {postData[props.id].adresse.strasse && (
                                        <span>{postData[props.id].adresse.strasse}</span>
                                    )}
                                </div>
                            )}
                            {postData[props.id].adresse != undefined && (
                                <div className="ort">
                                    {postData[props.id].adresse.ort && <span>{postData[props.id].adresse.ort}</span>}
                                </div>
                            )}
                            {postData[props.id].adresse != undefined && (
                                <div className="land">
                                    {postData[props.id].adresse.land && <span>{postData[props.id].adresse.land}</span>}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="fade-in-delayed my-4">
                        <Map id={props.id}></Map>
                    </div>

                    <div className="row mt-4 scale-in-ver-top-delayed">
                        <div className="col-12 ">
                            <VCFGenerator
                                firstName={postData[props.id].vorname}
                                lastName={postData[props.id].nachname}
                                role={postData[props.id].position}
                                phone={postData[props.id].kontakt.telefon}
                                url={postData[props.id].kontakt.website}
                                street={postData[props.id].adresse.strasse}
                                city={postData[props.id].adresse.ort}
                                country={postData[props.id].adresse.land}
                                email={postData[props.id].kontakt.email}
                            ></VCFGenerator>
                        </div>
                        <div className=" col-12 mt-2 mb-5">
                            <a href={`tel:${postData[props.id].kontakt.telefon}`} className="call button">
                                <i class="bi bi-telephone me-2"></i>
                                CALL
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
