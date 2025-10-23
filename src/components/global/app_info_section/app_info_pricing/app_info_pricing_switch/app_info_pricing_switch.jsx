import React from "react";
import '@/components/global/app_info_section/app_info_pricing/app_info_pricing.css';

export default function AppInfoPricingSwitch({ subscriptionType, setSubscriptionType}) {
    return (
        <div className="switch_container">
            <div
                className={`pricing_switch ${subscriptionType === "school" ? "active_switch" : ""}`}
                onClick={() => setSubscriptionType("school")}
            >
                School
            </div>
            <div
                className={`pricing_switch ${subscriptionType === "work" ? "active_switch" : ""}`}
                onClick={() => setSubscriptionType("work")}
            >
                Work
            </div>
        </div>
    );
}
