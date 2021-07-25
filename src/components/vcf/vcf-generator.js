import React, { useState, useEffect } from "react";
import Template from "./vcf-template";

export default function VCFGenerator(props) {
    const [postData, setPostData] = useState(null);

    useEffect(() => {}, []);

    function download(filename, text) {
        let element = document.createElement("a");
        element.style.display = "none";
        element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text));

        element.setAttribute("download", filename);
        document.body.appendChild(element);

        element.click();
        document.body.removeChild(element);
        console.log(text);
    }

    Template.FN = props.firstName;
    Template.N = props.lastName;
    Template.ROLE = props.role;
    Template.TEL = props.phone;
    Template.URL = props.url;
    Template.ADR = `${props.street} ${props.city} ${props.country}`;
    Template.EMAIL = props.email;

    let text = JSON.stringify(Template).replace(/[{}]/g, "").replace(/["]/g, "").replace(/[,]/g, "\n");
    let filename = `test.vcf`;

    return (
        <div>
            <div
                className="vcf button"
                onClick={() => {
                    download(filename, text);
                }}
            >
                DOWNLOAD VCF
            </div>
        </div>
    );
}
