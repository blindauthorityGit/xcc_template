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

import Sponsored from "./components/sponsored.js";

function App() {
    useEffect(() => {
        // let arr = Array.from(document.getElementsByClassName("box"));
        // let len = arr.length;
        // arr[len - 1].classList.add("mb-5");
    }, []);

    return (
        <div className="container-fluid">
            <div className="">
                <Settings></Settings>
            </div>
            <div className="wrapperMain">
                <Call></Call>
                <Person></Person>
                <Gallery></Gallery>
                <Youtube></Youtube>
                <Links></Links>
            </div>
            <Sponsored></Sponsored>
        </div>
    );
}

export default App;
