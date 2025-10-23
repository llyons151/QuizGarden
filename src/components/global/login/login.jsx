"use client";
import { useEffect, useState } from 'react';
import '@/components/global/login/login.css';
import { supabase } from '@/utils/supabaseClient';

export default function Login({ isLoginActive, setIsLoginActive, setIsSignupActive }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (session) {
      } else {
        console.log('No user logged in');
      }
    };

    getUser();
  }, [isLoginActive]);



  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      setIsLoginActive(false)
    }

    setLoading(false);
  };


  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
  
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // ← send Google back here
        redirectTo: `${window.location.origin}`,
      },
    });
    if (error) throw error;
    window.location.href = data.url;
      
  };
  
  useEffect(() => {
    setEmail("")
    setPassword("")
  }, [isLoginActive])

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        handleLogin(e);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [handleLogin]);

  if (!isLoginActive) return (<></>);

  return (
    <>
      <div className='blurred-overlay'></div>
      <div className='auth_container'>
        <div className='auth_box'>
                  <img
          src="images/x-button.png"
          alt="x"
          className="x"
          onClick={() => {
            setIsLoginActive(false);
          }}
        />

          <div className='auth_header'>
            <h1>Welcome back</h1>
            <h5>Please enter your details</h5>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleLogin} autoComplete="off">
            {/* Hidden dummy fields to capture browser autofill */}
            <input type="text" name="fakeuser" autoComplete="username" style={{ display: 'none' }} />
            <input type="password" name="fakepassword" autoComplete="new-password" style={{ display: 'none' }} />

            <div className='form_container'>
              <div className='input_container'>
                <h3>Email address</h3>
                <input
                  type="email"
                  className='form_input'
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="new-email"
                  required
                />
              </div>

              <div className='input_container'>
                <h3>Password</h3>
                <input
                  type="password"
                  className='form_input'
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
            <button className='login' type="submit" disabled={loading} onClick={handleLogin}>
              {loading ? 'Logging in...' : 'Log In'}
            </button>


          </form>

          <div className='line_container'>
            <div className='line'></div>
            <div className='line_text'> Or Continue With </div>
            <div className='line'></div>
          </div>

          <div className='alt_login_methods'>
            <button className='google_login' onClick={handleGoogleLogin} disabled={loading}>
              <img className='google_img' src="/images/auth/google.png" alt="Google" />
              {loading ? 'Google' : 'Google'}
            </button>
          {/*
              <button className='google_login' onClick={handleGoogleLogin} disabled={loading}>
              <img className='google_img' src="/images/auth/facebook.png" alt="Facebook" />
              {loading ? 'Facebook' : 'Facebook'}
            </button>
          */}
          
          </div>
                  <div className='signup_link_container'>
          <div className='footer_text'>Don't have an account?</div>
          <div
            className='link_to_signup'
            onClick={() => {
              setError(null)
              setIsLoginActive(false);
              setIsSignupActive(true);
            }}
          >
            Sign Up
          </div>
        </div>

        </div>
      </div>
    </>
  );
}      