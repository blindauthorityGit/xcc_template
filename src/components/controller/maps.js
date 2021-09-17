import React, { useState, useEffect } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import mapStyle from "./mapstyle";
import sanityClient from "../../../src/client";

export default function MyMap(props) {
    const [selectedPos, setSelectedPos] = useState(null);
    const [postData, setPostData] = useState(null);
    const [lat, setLat] = useState(0);
    const [long, setLong] = useState(0);
    const [street, setStreet] = useState(null);
    const [city, setCity] = useState(null);

    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == 'person']
              `
            )
            .then((data) => {
                setPostData(data);
                setStreet(data[props.id].adresse.strasse);
                setCity(data[props.id].adresse.ort);
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        const URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";
        // const KEY = Config.API.key;
        const KEY = "AIzaSyANZC5zZy_vjuY6zuLsYMYtH3l2Do6IbPo";
        const CALL = URL + street + " " + city + "&key=" + KEY;
        fetch(CALL)
            .then((response) => response.json())
            .then((data) => {
                setLat(data.results[0].geometry.location.lat);
                setLong(data.results[0].geometry.location.lng);
            })
            .catch(console.error);
    }, [street]);

    const Map = () => {
        return (
            <GoogleMap
                defaultZoom={14}
                defaultCenter={{
                    lat: lat,
                    lng: long,
                }}
                defaultOptions={{ styles: mapStyle }}
            >
                <Marker
                    position={{
                        lat: lat,
                        lng: long,
                    }}
                    onClick={() => {
                        setSelectedPos(this);
                    }}
                ></Marker>
                {selectedPos && (
                    <InfoWindow position={{ lat: 50.12363, lng: 8.64814 }}>
                        <div>Hier bin ich</div>
                    </InfoWindow>
                )}
            </GoogleMap>
        );
    };

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <WrappedMap
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyCmiEXV0BrJdbGVXXeCNdFB5vs-YA-vfmU&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `300px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        ></WrappedMap>
    );
}
