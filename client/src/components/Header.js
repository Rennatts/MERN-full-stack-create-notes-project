import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './css/Header.css';


export class Header extends Component {
    render() {
        return (
            <nav className="navbar_main">
                <Link to="/">
                    <div className="logo_container">
                        <strong className="logo">My Notes</strong>
                    </div>
                </Link>
                

                <div className="header_direita">
                    <li className="menu_item">
                        <Link className="links" to="/create-post">Create Post</Link>
                    </li>

                    <li className="menu_item">
                        <Link className="links" to="/about-us">About Us</Link>
                    </li>

                    
                    <li className="menu_item">
                        <Link className="teste" to="/teste">Teste</Link>
                    </li>
                </div>

            </nav>
        )
    }
}

export default Header
