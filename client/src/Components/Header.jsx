
import react from "react";

import { NavLink, Link, useNavigate } from "react-router-dom";

import { FaShopware } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';

export const Header = () => {

    const navigate = useNavigate();

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">

                        <Link to={"/"} className="navbar-brand" style={{ textTransform: "none" }}><FaShopware /> rR e-Com</Link>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to={"/"} className="nav-link">Home</NavLink>
                            </li>
                            <li className="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Product
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><NavLink className="dropdown-item" to={"/csv-file-upload"}>Upload CSV File</NavLink></li>

                                    <li><NavLink className="dropdown-item" to={"/get-all-products"}>Products</NavLink></li>
                                    <li><NavLink className="dropdown-item" to={"/get-all-csv-files"}>File Status</NavLink></li>

                                    
                                </ul>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/register"} className="nav-link">Register</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={"/login"} className="nav-link">Login</NavLink>
                            </li>
                        </ul>
                        {/* <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                        </form> */}
                    </div>
                </div>
            </nav>
        </>
    )
}