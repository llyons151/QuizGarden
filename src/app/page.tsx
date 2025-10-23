"use client";
import 'katex/dist/katex.min.css'
import React, { useState, useCallback, useEffect, useRef } from "react";
import "@/app/styles/index.css";
import "@/app/styles/global.css";
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { createClient } from '@supabase/supabase-js';

import Navbar from "@/components/global/navbar/navbar.jsx";
import HeaderContainer from "@/components/home/header_container/header_container.jsx";
import AddNotesNavbar from "@/components/home/add_notes_navbar/add_notes_navbar.jsx";
import ResourceContainer from "@/components/home/resource_container/resource_container.jsx";
import NotesNavbar from "@/components/home/notes_navbar/notes_navbar.jsx";
import QuizConfigNavbar from "@/components/home/quiz_config/quiz_config_navbar/quiz_config_navbar.jsx";
import QuizConfigContentBox from "@/components/home/quiz_config/quiz_config_content_box/quiz_config_content_box.jsx";
import Quiz from "@/components/quiz/quiz.jsx";

import Footer from "@/components/global/footer/footer.jsx";
import AppInfoSection from "@/components/global/app_info_section/app_info_section.jsx";
import Login from '@/components/global/login/login.jsx'
import Signup from '@/components/global/login/signup.jsx'
import LockScreen from '@/components/global/lock_screen/lock_screen.jsx'

export default function Home() {
  const paymentRef = useRef(null);
  const [selectedNoteType, setSelectedNoteType] = useState("");
  const [showQuizConfig, setShowQuizConfig] = useState(false);
  const [selectedSettingType, setSelectedSettingType] = useState("Difficulty");
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [resourcesList, setResourcesList] = useState([]);
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [isSignupActive, setIsSignupActive] = useState(false);
  const [lockQuiz, setLockQuiz] = useState(false);

  useEffect(() => {
    const json = localStorage.getItem("resourcesList");
    if (json) {
      try {
        setResourcesList(JSON.parse(json));
      } catch {
        console.error("Invalid JSON in resourcesList");
        setResourcesList([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("resourcesList", JSON.stringify(resourcesList));
  }, [resourcesList]);

  
  // Create a Supabase client instance
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string
  );

  const handleNoteAdded = useCallback((noteType: React.SetStateAction<string>) => {
    setSelectedNoteType(noteType);
  }, []);

  useEffect(() => {
    localStorage.setItem("resourcesList", JSON.stringify(resourcesList));
  }, [resourcesList]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isQuizActive])

  function renderLanding() {
    if (lockQuiz === true) {
      return (
        <LockScreen />
      )
    }
    return (
      <div className="render_landing_container">
        {/* Notes & Resources Section */}
        <section className="resource_and_notes_container">
          <AddNotesNavbar
            onNoteAdded={handleNoteAdded}
            selectedNoteType={selectedNoteType}
          />
          <ResourceContainer
            selectedNoteType={selectedNoteType}
            setSelectedNoteType={setSelectedNoteType}
            resourcesList={resourcesList}
            setResourcesList={setResourcesList}
          />

          {selectedNoteType == "" &&
            <NotesNavbar
              setShowQuizConfig={setShowQuizConfig}
              setIsQuizActive={setIsQuizActive}
              resourcesList={resourcesList}
              paymentRef={paymentRef}
              setLockQuiz={setLockQuiz}
              setIsSignupActive={setIsSignupActive}
            />
          }
        </section>

        {/* Quiz Configuration */}
        {showQuizConfig && (
          <section className="quiz_config_container">
            <QuizConfigNavbar
              selectedSettingType={selectedSettingType}
              setSelectedSettingType={setSelectedSettingType}
            />
            <QuizConfigContentBox
              selectedSettingType={selectedSettingType}
            />
          </section>
        )}
      </div>
    );
  }

  function renderQuiz() {
    return (
      <div className="quiz_wrapper">
        <Quiz setIsQuizActive={setIsQuizActive} />
      </div>
    );
  }

  if (isQuizActive) {
    return (
      <SessionContextProvider supabaseClient={supabase}>

        {renderQuiz()}

      </SessionContextProvider>

    )
  } else {
    return (
      <SessionContextProvider supabaseClient={supabase}>
        <Navbar setIsLoginActive={setIsLoginActive} setIsSignupActive={setIsSignupActive} />
        <Login isLoginActive={isLoginActive} setIsLoginActive={setIsLoginActive} setIsSignupActive={setIsSignupActive} />
        <Signup isSignupActive={isSignupActive} setIsSignupActive={setIsSignupActive} setIsLoginActive={setIsLoginActive} />

        <HeaderContainer />
        {renderLanding()}
        <AppInfoSection paymentRef={paymentRef} setIsSignupActive={setIsSignupActive} />

        <Footer paymentRef={paymentRef} />
      </SessionContextProvider>

    )
  }
}
