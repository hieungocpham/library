import { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
export default function Header(){
    const [username,setUsername] = useState("")
    function logOut(){
        localStorage.clear();
        localStorage.clear()
        window.location.href="/"
    }
    useEffect(()=>{
        setUsername(localStorage.getItem("username"))
    },[]);
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" class="navbar-brand" href="#">Library</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <Link class="nav-link" to="/">Home <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="purchase-history">Purchase History <span class="sr-only">(current)</span></Link>
                        </li>
                        <li class="nav-item active">
                            <Link class="nav-link" to="cart">Cart <span class="sr-only">(current)</span></Link>
                        </li>
                    </ul>
                    <div>
                        <div style={{display: !username? "block":"none" }}>
                            <Link to="/login" className="btn btn-primary mr-2">Login</Link>
                            <Link to="/sign-up" className="btn btn-danger">Signup</Link>
                        </div>
                        <div style={{display: username? "flex":"none" }}>
                            <div class="mr-3 h5 text-capitalize fw-normal pt-2">{username}</div>
                            <button onClick={logOut} className="btn btn-danger mr-2">Log out</button>
                        </div>
                    </div>

                </div>
            </nav>         
        </div>
    );
}