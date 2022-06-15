import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logout.css";

const LogoutComp=()=>{
    let nav = useNavigate();
    const Logouthandler=()=>{
        localStorage.clear();
        return nav("/login");
    };
    return(
        <div className="LogoutContainer">
            <button className="LogoutButton" onClick={Logouthandler}><i className="fa-solid fa-arrow-right-from-bracket"></i>Logout</button>
        </div>
    );
}

export default LogoutComp;