import React from 'react';
import "../style/register.css";
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../GoogleLogin';


const Register = () => {
    const navigate = useNavigate();  // Initialize the navigate hook

    return (
        <div className='RegisterBox'>
            <div className='formRegister'>
                <h1>Create An Account With Us..</h1>
                <div className="input-group">
                    <label>Full Name</label>
                    <input type="text" placeholder="Enter Your Name" />
                </div>
                <div className="input-group">
                    <label>Email</label>
                    <input type="email" placeholder="Email" />
                </div>
                <div className="input-group">
                    <label>Contact Details</label>
                    <input type="number" placeholder="+44 (0)123456789" />
                </div>
                <div className="input-group">
                    <label>Date Of Birth</label>
                    <input type="date" placeholder="Dob" />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input type="password" placeholder="Enter Your Password" />
                </div>

                <button className="btngroup">
                    <button type="submit" className="sign-in-btn">Sign Up</button>
                    <button type="submit" className="Loginbtn" onClick={() => { navigate("/login") }}>Login Here...</button>
                </button>

                <hr />
                <h6 style={{textAlign:"center",margin:"15px"}}> Use Your Scoial Media Accounts </h6>

               <GoogleLogin />

                <a href="" class="fb connect">Sign in with Facebook</a>
            </div>
        </div>
    );
}

export default Register;
