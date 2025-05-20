import React, { useState } from 'react';
import "../style/login.css";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { handleErrorTostify, handleSucessTostify } from './Tostify';

const Login = () => {
    const navigate = useNavigate();

    const [loginForm, setLoginForm] = useState({
        email: "", password: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginForm;

        if (!email || !password) {
            return handleErrorTostify("All fields are required!");
        }

        try {
            const response = await fetch("http://localhost:8080/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(loginForm)
            });

            const result = await response.json();
            const { success, message, error, jwtToken, fullname } = result;

            if (success) {
                handleSucessTostify(message || "Login successful!");
                console.log("JWT Token:", jwtToken, fullname);
                localStorage.setItem("token", jwtToken);
                localStorage.setItem("userName", fullname);

                // Dispatch custom event to notify other components (like Navbar)
                window.dispatchEvent(new Event('storage'));

                setTimeout(() => {
                    navigate("/");
                }, 1000);
            } else {
                const details = error?.details?.[0]?.message || message || "Login failed.";
                handleErrorTostify(details);
            }
        } catch (err) {
            console.error(err);
            handleErrorTostify("Something went wrong.");
        }
    };

    const handleGoogleLogin = async (credentialResponse) => {
        const res = await fetch("http://localhost:5000/api/auth/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: credentialResponse.credential }),
        });

        const data = await res.json();
        console.log("Google JWT Token:", data.token);
        if (data?.token) {
            handleSucessTostify("Google login successful!");
            localStorage.setItem("token", data.token);
            // Ideally, get username and set here too if your API returns it
            // localStorage.setItem("userName", data.fullname || "User");
            
            // Notify storage change for navbar update
            window.dispatchEvent(new Event('storage'));

            setTimeout(() => {
                navigate("/");
            }, 1000);
        } else {
            handleErrorTostify("Google login failed.");
        }
    };

    const handleError = () => {
        console.error('Google login failed.');
        handleErrorTostify("Google login failed.");
    };

    return (
        <form className='container' onSubmit={handleLogin}>
            <div className="form-left">
                <h2>Welcome back</h2>
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={loginForm.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Use Minimum 4 characters"
                        value={loginForm.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="btngroup">
                    <button type="submit" className="sign-in-btn">Sign In</button>
                    <button type="button" className="Loginbtn" onClick={() => navigate("/SignUp")}>Create An Account</button>
                </div>

                <hr />
                <h6 style={{ textAlign: "center", margin: "15px" }}>Use Your Social Media Accounts</h6>

                <div>
                    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                        <GoogleLogin onSuccess={handleGoogleLogin} onError={handleError} />
                    </GoogleOAuthProvider>
                </div>
                <a href="#" className="fb connect">Sign in with Facebook</a>
            </div>
        </form>
    );
};

export default Login;
