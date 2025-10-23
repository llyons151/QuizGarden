"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabaseClient";

export default function Signup({ isSignupActive, setIsSignupActive, setIsLoginActive }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // Handle the signup logic
    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { user, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    subscription_type: 'free',
                    subscription_status: 'inactive'
                }
            }
        });

        if (error) {
            setError("Signup failed. Please try again.");
        } else {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
        }
        setError("Email conformation sent")

        setLoading(false);
        //setIsSignupActive(false)
    };

    // Handle Google signup logic
    const handleGoogleSignup = async () => {
        setLoading(true);

        const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            redirectTo: "https://jcatjgmhogwmdytpremc.supabase.co/auth/v1/callback",
        });

        if (error) {
            setError(error.message);
        } else {
            const { data: signInData, error: signInError } =
                await supabase.auth.signInWithPassword({ email, password });

            if (signInError) {
                setError("Signed up, but could not automatically log you in. Please try logging in.");
            } else {
                // success! session is established
                setIsSignupActive(false);
                setLoading(false);
            }
        }
    };

    useEffect(() => {
        setEmail("")
        setPassword("")
    }, [isSignupActive])

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSignup(e);
            }
        };

        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [handleSignup]);

    if (!isSignupActive) return null;

    return (
        <>
            <div className='blurred-overlay'></div>
            <div className='auth_container'>
                <div className='auth_box'>
                    <img src="images/x-button.png" alt="x" className="x" onClick={() => {
                        setIsSignupActive(false)
                    }} />

                    <div className='auth_header'>
                        <h1>Sign Up For Free</h1>
                        <h5>Please enter your details</h5>
                    </div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form onSubmit={handleSignup}>
                        <div className='form_container'>
                            <div className='input_container'>
                                <h3>Email address</h3>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className='form_input'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="new-email"
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
                                    required
                                    autoComplete="new-password"
                                />
                            </div>
                        </div>
                        <button className='login' type="submit" disabled={loading} onClick={handleSignup}>
                            {loading ? 'Logging in...' : 'Sign Up'}
                        </button>

                    </form>



                    <div className='line_container'>
                        <div className='line'></div>
                        <div className='line_text'> Or Sign Up With </div>
                        <div className='line'></div>
                    </div>

                    <div className='alt_login_methods'>
                        <button className='google_login' onClick={handleGoogleSignup} disabled={loading}>
                            <img className='google_img' src="/images/auth/google.png" alt="" />
                            {loading ? 'Signing in with Google...' : 'Google'}
                        </button>
                    </div>

                    <div className='signup_link_container'>
                        <div className='footer_text'>Already have an account?</div>
                        <div className='link_to_signup' onClick={() => {
                            setError(null)
                            setIsSignupActive(false);
                            setIsLoginActive(true);
                        }}>Log In</div>
                    </div>

                </div>
            </div>

        </>
    );
};
