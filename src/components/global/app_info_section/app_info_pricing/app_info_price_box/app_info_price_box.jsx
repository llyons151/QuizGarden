import React, { useState } from "react";
import '@/components/global/app_info_section/app_info_pricing/app_info_pricing.css';
import CheckoutButton from '@/components/global/checkout_button/checkout_button.jsx'
export default function AppInfoPriceBox({ type, priceInfo, setIsSignupActive }) {
  return (
    <div className={` ${type === 1 ? "pro_price_box" : "price_box"}`}>
      <div className="section row">
        <div className="price_box_header">{priceInfo[type].header}</div>

      </div>

      <div className="section">
        <div className="price_display">
          {priceInfo[type].price}$ <div className="durration_display">/month</div>
        </div>
      </div>

      <div className="section">
        {Array.isArray(priceInfo[type].features) &&
          priceInfo[type].features.map((info, index) => (
            <div className="info_container" key={index}>
              <img
                src="images/check.png"
                alt="check"
                className="chcek_box"
              />
              <div className="info_text">{info}</div>
            </div>
          ))}
      </div>
      <CheckoutButton priceId={priceInfo[type].monthly_price_id} setIsSignupActive={setIsSignupActive} buttonText={priceInfo[type].button_text}/>
    </div>
  );
}