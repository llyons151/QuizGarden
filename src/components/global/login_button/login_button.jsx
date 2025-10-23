"use client";  // This ensures that the component is rendered on the client side

import React from "react";
import { useRouter } from "next/navigation"; // Using the correct router from next/navigation
import "@/components/global/login_button/login_button.css"; // Correct path for your CSS

function LoginButton({setIsLoginActive}) {
    const router = useRouter();

    // Redirect to the login page when clicked
    const handleLogin = () => {
        setIsLoginActive(true)
    };

    return (
        <button className="login_button" onClick={handleLogin}>
            Log In
        </button>
    );
}

export default LoginButton;
