import React, { useState, useEffect, useRef } from "react";

import logo from "./logo.svg";
import "./App.css";
import "./css/main.css";

import Person from "./components/person.js";
import Gallery from "./components/gallery.js";
import Youtube from "./components/youtube.js";
import Settings from "./components/settings.js";
import Call from "./components/callme.js";
import Links from "./components/link.js";
import Email from "./components/email.js";

import Sponsored from "./components/sponsored.js";

function App() {
    useEffect(() => {}, []);

    return (
        <div className="container-fluid position-relative">
            <div className="">
                <Settings></Settings>
            </div>
            <div className="wrapperMain">
                <div className="row">
                    <Gallery></Gallery>
                    <Youtube></Youtube>
                    <Links></Links>
                    <Person></Person>
                    <Email></Email>
                    <Call></Call>
                </div>
            </div>
            <Sponsored></Sponsored>
        </div>
    );
}

export default App;
