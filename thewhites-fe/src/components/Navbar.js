import {React, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import logo from "../images/sa-logo.png"
import './Navbar.css';

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <nav>
            <Link to="/" className="title">
                <img src={logo} width={375} height={100} />
            </Link>
            <div className="menu" onClick={() => setToggleMenu(!toggleMenu)}>
                <span />
                <span />
                <span />
            </div>
            <ul className={toggleMenu ? "toggled" : ""}>
                <li>
                    <NavLink to = "/over-ons">Over ons</NavLink>
                </li>
                <li>
                    <NavLink to = "/contact">Contact</NavLink>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;
