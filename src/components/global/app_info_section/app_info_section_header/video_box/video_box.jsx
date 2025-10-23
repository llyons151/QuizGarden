// components/global/app_info_section/VideoBox.jsx
import React from "react";
import "@/components/global/app_info_section/app_info_section.css";

export default function VideoBox() {
  return (
    <div className="video_box">
      <video
        muted
        autoPlay
        loop
        playsInline
        webkit-playsinline="true"   /* for older iOS */
        className="video_element"
      >
        <source src="/videos/home_video_1.mp4" type="video/mp4" />
        Sorry, your browser doesn’t support embedded videos.
      </video>
    </div>
  );
}
