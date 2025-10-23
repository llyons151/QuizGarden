import React, { useEffect, useRef } from "react";
import '@/components/global/user_profile/user_profile.css'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link'

export default function UserDashboard({ setUserDashIsActive }) {
  const dashboardRef = useRef(null);
  const supabase = useSupabaseClient();
  const user = useUser() || null;

  // Safeguard in case user is null
  let userName = user ? user.email.split('@')[0] : 'Guest';
  userName = userName.charAt(0).toUpperCase() + userName.slice(1);

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error logging out:", error);
      } else {
        // Optionally, perform additional state updates,
        // e.g., redirect the user or reset UI states
        console.log("User logged out successfully");
      }
    } catch (err) {
      console.error("Unexpected error during logout:", err);
    }
  };

  useEffect(() => {
    // Delay adding the "open" class to trigger the slide-in effect after mount.
    const timer = setTimeout(() => {
      if (dashboardRef.current) {
        dashboardRef.current.classList.add('open');
      }
    }, 10); // small delay to ensure the initial render is complete

    return () => clearTimeout(timer);
  }, []); // Runs once on mount

  const handleClose = () => {
    if (dashboardRef.current) {
      dashboardRef.current.classList.remove('open');
      // Force reflow so the browser registers the change.
      void dashboardRef.current.offsetWidth;
      dashboardRef.current.classList.add('close');
    }
    setTimeout(() => {
      setUserDashIsActive(false);
    }, 800);
  }

  async function openCancellationPortal(userId) {
    const res = await fetch('/api/create-cancellation-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId })
    });

    if (!res.ok) {
      console.error('Failed to create cancellation session', await res.text());
      return;
    }

    const { url } = await res.json();
    window.location.assign(url);
  }

  return (
    <div className="dashboard_container" ref={dashboardRef}>
      <div className="dash_header">
        <div className="header_section">
          <img src="images/user.png" className="user" alt="User" />
          <div className="user_info">
            <div>{userName}</div>
            <div></div>
          </div>
        </div>
        <div className="header_section">
          <img
            src="images/close.png"
            alt="close"
            className="close"
            onClick={() => {
              handleClose()
            }}
          />
        </div>
      </div>

      <div className="line"></div>

      <div className="actions_list">

        <Link href="/privacy-policy" className="action_child">
          <img src="/images/privacy.png" alt="Privacy" className="icon" />
          Privacy Policy
        </Link>
        <div className="action_child" onClick={() => {
          openCancellationPortal(user.id)
        }}>
          <img src="images/file.png" alt="sub" className="icon" />Cancel Subscription
        </div>

        <div className="action_child" onClick={handleLogout}>
          <img src="images/logout.png" alt="logout" className="icon" />Log Out
        </div>

      </div>

    </div>
  );
}
