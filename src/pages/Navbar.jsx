import React, { useState, useEffect, useRef } from "react";
import "../style/navbar.css";
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink, useNavigate } from "react-router-dom";


const CartBadge = styled(Badge)`
& .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
    }
`;

const Navbar = () => {
    const navigate = useNavigate();  // Initialize the navigate hook
    const handleLogin = () => {
        navigate("/login")
        closeMenu();
    }
    const handleRegister = () => {
        navigate("/createAnAccount")
        closeMenu();
    }

    const [menubar, setMenu] = useState(false);
    const menuRef = useRef(null); // Reference to menu for closing when clicking outside
    const iconRef = useRef(null); // Reference to the menu icon

    const handleChange = () => {
        setMenu(!menubar);
        // Add/remove no-scroll class based on the menu state
        if (!menubar) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    };

    const closeMenu = () => {
        setMenu(false);
        document.body.classList.remove('no-scroll');
    }

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target) && iconRef.current && !iconRef.current.contains(e.target)) {
                closeMenu();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const [navBg, setNavBg] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 90) {
                setNavBg(true);
            } else {
                setNavBg(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className={`navBox ${navBg ? "scrolled" : ""}`}>
            <p onClick={() => { navigate("/") }} style={{ margin: "0" }}>Luxora</p>

            {menubar ? (
                <div className='mobileNav' ref={menuRef}>
                    <NavLink className="links" to="/" end onClick={closeMenu}>Home</NavLink>
                    <NavLink className="links" to="/AllProduct" end onClick={closeMenu}>Product</NavLink>
                    {/* <NavLink className="links" to="/man" end onClick={closeMenu}>Man</NavLink>
                    <NavLink className="links" to="/woman" end onClick={closeMenu}>Woman</NavLink> */}
                    <NavLink className="links" to="/contactUs" end onClick={closeMenu}>Contact Us</NavLink>
                    <div className="authBtnMobile">
                        <button className="loginBtn" onClick={handleLogin}>Login
                            <span></span>
                        </button>
                        <button className="loginBtn" onClick={handleRegister}>Register
                            <span></span>
                        </button>
                    </div>
                </div>
            ) : (
                <ul className='navLinks'>
                    <NavLink className="links" to="/" end>Home</NavLink>
                    <NavLink className="links" to="/AllProduct" end onClick={closeMenu}>Product</NavLink>
                    {/* <NavLink className="links" to="/man" end onClick={closeMenu}>Man</NavLink>
                    <NavLink className="links" to="/woman" end onClick={closeMenu}>Woman</NavLink> */}
                    <NavLink className="links" to="/contactUs" end onClick={closeMenu}>Contact Us</NavLink>
                </ul>
            )}

            <IconButton onClick={()=>{navigate("/cart")}}>
                <ShoppingCartIcon style={{ color: "black" }} fontSize="medium" />
                <CartBadge badgeContent={2} color="primary" overlap="circular" />
            </IconButton>

            <div className='userAuth'>
                <button className="loginBtn" onClick={handleLogin}>Login
                    <span></span>
                </button>
                <button className="loginBtn" onClick={handleRegister}>Register
                    <span></span>
                </button>
            </div>

            <div className='mobileScreen'>
                <IconButton onClick={handleChange} ref={iconRef}>
                    {menubar ? <CloseIcon style={{ color: "black" }} fontSize="large" /> : <MenuIcon style={{ color: "black" }} fontSize="large" />}
                </IconButton>
            </div>
        </div>
    );
}

export default Navbar;
