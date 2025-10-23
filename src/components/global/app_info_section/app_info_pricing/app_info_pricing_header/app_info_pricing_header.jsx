import React from "react";
import '@/components/global/app_info_section/app_info_pricing/app_info_pricing.css'

export default function AppInfoPricingHeader({paymentRef}){
    return(
        <div className="app_info_pricing_header_container">
            <div className="app_info_pricing_header"ref={paymentRef}> Simple, transparent  <div className="pricing_header">pricing</div> </div>
            <div className="app_info_pricing_subheader"> Choose the plan that's right for you </div>
        </div>
    )
}