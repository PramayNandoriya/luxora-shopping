import React from 'react';
import "../style/register.css";
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { useState } from 'react';
import { handleErrorTostify, handleSucessTostify } from './Tostify';


const Register = () => {
    const navigate = useNavigate();  // Initialize the navigate hook


    const [registerForm, setRegisterForm] = useState({
        fullname: "", email: "", contact: "", Dob: "", password: ""
    })

    const handleError = () => {
        alert("Google login failed. Try again.");
    };


    const handleGoogleLogin = async (credentialResponse) => {
        const res = await fetch("http://localhost:5000/api/auth/google-login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: credentialResponse.credential }),
        });

        const data = await res.json();
        // console.log("JWT Token:", data.token);
    };

    const handleSuccess = (credentialResponse) => {
        handleGoogleLogin(credentialResponse);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        const copyRegisterData = { ...registerForm }
        copyRegisterData[name] = value;
        setRegisterForm(copyRegisterData)
    }

    const handleRegisterData = async (e) => {
    e.preventDefault();
    const { fullname, email, contact, Dob, password } = registerForm;

    if (!fullname || !email || !contact || !Dob || !password) {
        return handleErrorTostify("All fields are required!");
    }

    try {
        const url = "http://localhost:8080/auth/SignUp";
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...registerForm,
                Dob: new Date(Dob).getTime() // ensure DOB is number if backend expects it
            })
        });

        const result = await response.json();
        const { success, message, error } = result;

        if (success) {
            handleSucessTostify(message || "Successfully registered!");
            setTimeout(() => {
                navigate("/login");
            }, 1000);
        } else if (error) {
            const details = error?.details?.[0]?.message || error?.message || message || "Registration failed.";
            console.log("Error:", details);
            handleErrorTostify(details);
        } else {
            handleErrorTostify(message || "Registration failed.");
        }
    } catch (err) {
        console.error(err);
        handleErrorTostify("Something went wrong.");
    }
};

    return (
        <form className='' onSubmit={handleRegisterData}>
            <div className='RegisterBox'>
                <div className='formRegister'>
                    <h1>Create An Account With Us..</h1>
                    <div className="input-group">
                        <label >Full Name</label>
                        <input onChange={handleChange} type="text" name='fullname' autoFocus placeholder="Enter Your Name" value={registerForm.fullname} />
                    </div>
                    <div className="input-group">
                        <label>Email</label>
                        <input onChange={handleChange} type="email" name='email' placeholder="Enter Your Email" value={registerForm.email} />
                    </div>
                    <div className="input-group">
                        <label>Contact Details</label>
                        <input onChange={handleChange} type="tel" name="contact" placeholder="+44    (0)123456789" maxLength={14} value={registerForm.contact} />
                    </div>
                    <div className="input-group">
                        <label>Date Of Birth</label>
                        <input onChange={handleChange} type="date" name='Dob' placeholder="Dob" value={registerForm.Dob} />
                    </div>
                    <div className="input-group">
                        <label>Password</label>
                        <input onChange={handleChange} type="password" name='password' placeholder="Enter Your Password" value={registerForm.password} />
                    </div>

                    <div className="btngroup">
                        <button type="submit" className="sign-in-btn">Sign Up</button>
                        <button className="Loginbtn" onClick={() => { navigate("/login") }}>Login Here...</button>
                    </div>

                    <hr />
                    <h6 style={{ textAlign: "center", margin: "15px" }}> Use Your Scoial Media Accounts </h6>


                    <div>
                        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
                        </GoogleOAuthProvider>
                    </div>
                    <a href="" className="fb connect">Sign in with Facebook</a>
                </div>
            </div>
        </form>
    );
}

export default Register;
