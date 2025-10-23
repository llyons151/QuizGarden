import React, { useState, useEffect } from "react";
import "@/components/global/navbar/navbar.css";
import SignupButton from "@/components/global/signup_button/signup_button.jsx";
import LoginButton from "@/components/global/login_button/login_button.jsx";
import UserProfile from "@/components/global/user_profile/user_profile.jsx"
import { useUser } from '@supabase/auth-helpers-react';

function Navbar({ setIsLoginActive, setIsSignupActive }) {
    const [darkMode, setDarkMode] = useState(false);
    const userContext = useUser();

    // Destructure the user property; this might be null initially.
    const user = userContext || null;

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme");
        if (storedTheme === "dark") {
            setDarkMode(true);
            document.body.classList.add("dark-mode");
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);

        if (newMode) {
            document.body.classList.add("dark-mode");
            localStorage.setItem("theme", "dark");
        } else {
            document.body.classList.remove("dark-mode");
            localStorage.setItem("theme", "light");
        }
    };

    return (
        <div className="navbar_container">
            <div className="navbar_left">

                <div className="title_header">
                    <img src="images/nature.png" alt="leaf" className="logo_icon" />

                    <div className="green">Quiz</div>
                    <div className="black">Garden</div>
                    </div>
            </div>
            <div className="navbar_right">
                {/*if user is not logged in*/}
                {!user && <>
                    <LoginButton setIsLoginActive={setIsLoginActive} />
                    <SignupButton setIsSignupActive={setIsSignupActive} />
                </>}
                {/*if user is logged in*/}
                {user && <>
                    <UserProfile />
                </>}

                {/*
                                <img
                    src={darkMode ? "/images/darkmode.png" : "/images/lightmode.png"}
                    alt="Dark Mode Toggle"
                    className="darkmode_toggle"
                    onClick={toggleDarkMode}
                />
                */}
            </div>
        </div>
    );
}

export default Navbar;
