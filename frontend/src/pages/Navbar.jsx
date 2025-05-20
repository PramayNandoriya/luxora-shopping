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
  const navigate = useNavigate();

  const [userName, setUserName] = useState(localStorage.getItem('userName') || "");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);

  // Update username on storage change (login/logout)
  useEffect(() => {
    const handleStorageChange = () => {
      setUserName(localStorage.getItem('userName') || "");
      setDropdownOpen(false); // close dropdown on storage change
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        avatarRef.current &&
        !avatarRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    setUserName("");
    setDropdownOpen(false);
    navigate("/login");
  };

  const [menubar, setMenu] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);

  const handleChange = () => {
    setMenu(!menubar);
    if (!menubar) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const closeMenu = () => {
    setMenu(false);
    document.body.classList.remove('no-scroll');
  };

  useEffect(() => {
    const handleClickOutsideMenu = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        iconRef.current &&
        !iconRef.current.contains(e.target)
      ) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutsideMenu);
    return () => document.removeEventListener("mousedown", handleClickOutsideMenu);
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

  const handleLogin = () => {
    navigate("/login");
    closeMenu();
  };
  const handleRegister = () => {
    navigate("/SignUp");
    closeMenu();
  };

  return (
    <div className={`navBox ${navBg ? "scrolled" : ""}`}>
      <p onClick={() => { navigate("/") }} style={{ margin: "0", cursor: "pointer" }}>Luxora</p>

      {menubar ? (
        <div className='mobileNav' ref={menuRef}>
          <NavLink className="links" to="/" end onClick={closeMenu}>Home</NavLink>
          <NavLink className="links" to="/AllProduct" end onClick={closeMenu}>Product</NavLink>
          <NavLink className="links" to="/contactUs" end onClick={closeMenu}>Contact Us</NavLink>
          <div className="authBtnMobile">
            <button className="loginBtn" onClick={handleLogin}>Login<span></span></button>
            <button className="loginBtn" onClick={handleRegister}>Register<span></span></button>
          </div>
        </div>
      ) : (
        <ul className='navLinks'>
          <NavLink className="links" to="/" end>Home</NavLink>
          <NavLink className="links" to="/AllProduct" end onClick={closeMenu}>Product</NavLink>
          <NavLink className="links" to="/contactUs" end onClick={closeMenu}>Contact Us</NavLink>
        </ul>
      )}

      <IconButton onClick={() => { navigate("/cart") }}>
        <ShoppingCartIcon style={{ color: "black" }} fontSize="medium" />
        <CartBadge badgeContent={2} color="primary" overlap="circular" />
      </IconButton>

      {
        userName ? (
          <div className="userAvatarWrapper" style={{ position: "relative" }}>
            <button
              ref={avatarRef}
              onClick={toggleDropdown}
              style={{
                backgroundColor: "#1976d2",
                borderRadius: "50%",
                color: "white",
                width: "35px",
                height: "35px",
                fontSize: "20px",
                border: "none",
                cursor: "pointer",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 0,
              }}
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              aria-label="User menu"
            >
              {userName.charAt(0).toUpperCase()}
            </button>

            {dropdownOpen && (
              <div
                ref={dropdownRef}
                style={{
                  position: "absolute",
                  right: 0,
                  top: "45px",
                  background: "white",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                  borderRadius: "4px",
                  minWidth: "120px",
                  zIndex: 1000,
                }}
              >
                <button
                  onClick={handleLogout}
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    background: "none",
                    border: "none",
                    textAlign: "left",
                    cursor: "pointer",
                    fontSize: "16px",
                    color: "#333",
                  }}
                  onMouseDown={(e) => e.preventDefault()} // Prevent focus loss on click
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className='userAuth'>
            <button className="loginBtn" onClick={handleLogin}>Login<span></span></button>
            <button className="loginBtn" onClick={handleRegister}>Register<span></span></button>
          </div>
        )
      }

      <div className='mobileScreen'>
        <IconButton onClick={handleChange} ref={iconRef}>
          {menubar ? <CloseIcon style={{ color: "black" }} fontSize="large" /> : <MenuIcon style={{ color: "black" }} fontSize="large" />}
        </IconButton>
      </div>
    </div>
  );
}

export default Navbar;
