import React, { useState } from "react";
import '@/components/global/app_info_section/app_info_pricing/app_info_pricing.css'
import AppInfoPricingHeader from '@/components/global/app_info_section/app_info_pricing/app_info_pricing_header/app_info_pricing_header.jsx'
import AppInfoPricingSwitch from '@/components/global/app_info_section/app_info_pricing/app_info_pricing_switch/app_info_pricing_switch.jsx'
import AppInfoPriceBox from '@/components/global/app_info_section/app_info_pricing/app_info_price_box/app_info_price_box.jsx'

import { priceInfo } from '@/components/global/app_info_section/app_info_pricing/price_info.js'

export default function AppInfoPricing({ paymentRef, setIsSignupActive }) {

  return (
    <div className="app_info_pricing_container">
      <div className="top_container">
        <AppInfoPricingHeader paymentRef={paymentRef} />
      </div>

      <div className="price_boxes_container">
        <AppInfoPriceBox type={0}  priceInfo = {priceInfo} setIsSignupActive={setIsSignupActive}/>
        <AppInfoPriceBox type={1}   priceInfo = {priceInfo} setIsSignupActive={setIsSignupActive}/>
        <AppInfoPriceBox type={2}   priceInfo = {priceInfo} setIsSignupActive={setIsSignupActive}/>
      </div>
    </div>
  );
}
