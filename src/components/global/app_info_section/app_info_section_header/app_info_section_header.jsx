import React, { useEffect, useRef, useState } from "react";
import "@/components/global/app_info_section/app_info_section.css";
import InfoBox from "@/components/global/app_info_section/app_info_section_header/info_box/info_box.jsx";
import VideoBox from "@/components/global/app_info_section/app_info_section_header/video_box/video_box.jsx";
import { useRouter } from "next/navigation"; // Using the correct router from next/navigation

export default function AppInfoSectionHeader({setIsSignupActive}) {
  const [hasloaded, setHasLoaded] = useState(false)
  const iconList = ["analysis", "brain", "idea"];
  const iconHeaders = [
    "Expand Your Mind",
    "Learn and Grow",
    "Master Your Skills"
  ];
  const iconTexts = [
    "Unlock new perspectives with our curated collection of literature and articles designed to inspire and educate",
    "Immerse yourself in a dynamic educational environment that nurtures growth and equips you with essential skills",
    "Experience interactive study sessions and practical resources that empower you to excel in your endeavors"
  ];


  const handleSignup = () => {
    setIsSignupActive(true)
  };

  const containerRef = useRef(null);
  // Create the observer
  useEffect(() => {
    // Make sure the ref is attached
    if (!containerRef.current) return;
    if (hasloaded) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            setHasLoaded(true)
          } else {
            // If you don't want to remove the effect once it appears,
            // you can omit this else statement
            entry.target.classList.remove("in-view");
          }
        });
      },
      {
        threshold: 0.1, // Adjust as needed
      }
    );

    observer.observe(containerRef.current);

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="info_header_background_container" id="info_header_container">


      <div className="info_header_text_container" ref={containerRef}>
        <div className="info_header_header"> Never Struggle with a Test Again</div>
        <div className="info_header_subheader">Upload your notes, text, study guides—or even links—to generate accurate, AI-powered practice quizzes in minutes.</div>
        <button className="info_signup" onClick={() => {
          setIsSignupActive(true)
        }
        }>Generate For Free Today!</button>
      </div>

      <div className="info_video_box_container">
        <VideoBox />
      </div>

      {/*
                <d1iv className="box_container">
          {iconList.map((icon, index) => (
            <InfoBox
              key={index}
              icon={`images/landing_icons/${icon}.png`}
              header={iconHeaders[index]}
              text={iconTexts[index]}
            />
          ))}
        </div>

        */}
    </div>


  );
}