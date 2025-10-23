import React from "react";
import "@/components/global/app_info_section/app_info_section.css"; 

export default function InfoBox({ icon, header, text }) {
    return (
        <div className="info_box_container">
            <img className="info_box_icon" src={icon} />
            <div className="info_box_header"> {header} </div>
            <div className="info_box_text">{text}</div>
        </div>
    )
}