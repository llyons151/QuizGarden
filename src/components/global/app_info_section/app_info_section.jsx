import React from "react";
import "@/components/global/app_info_section/app_info_section.css";
import AppInfoSectionHeader from "@/components/global/app_info_section/app_info_section_header/app_info_section_header.jsx";
import AppInfoPricing from "@/components/global/app_info_section/app_info_pricing/app_info_pricing.jsx";

export default function AppInfoSection({paymentRef , setIsSignupActive}) {

  return (
    <div className="info_section_container">
      <AppInfoSectionHeader setIsSignupActive={setIsSignupActive}/>
      <AppInfoPricing paymentRef={paymentRef} setIsSignupActive={setIsSignupActive}/>
    </div>
  );
}
