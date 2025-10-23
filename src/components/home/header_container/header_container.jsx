import React from "react";
import '@/components/home/header_container/header_container.css'


function HeaderContainer(){
    return(
        <div className="page_header_container"> 
            <div className="page_header_text"> 
                <div className="green">Advanced AI</div>
                <div className="black">Quiz Maker</div>

                </div>
            <div className="header_subtext">
                    Grow your knowladge though practice
            </div>

        </div>
    )
}

export default HeaderContainer;