"use client";  // This ensures that the component is rendered on the client side

import React from "react";
import "@/components/global/signup_button/signup_button.css"; // Correct path for your CSS

function SignupButton({setIsSignupActive}) {

    // Redirect to the signup page when clicked
    const handleSignup = () => {
        setIsSignupActive(true)
    };

    return (
        <button className="signup_button" onClick={handleSignup}>
            Sign Up
        </button>
    );
}

export default SignupButton;
