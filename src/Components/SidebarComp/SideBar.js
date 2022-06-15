import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
//import LogoutComp from "../Logout/Logout";
import "./Sidebar.css";


const NavbarComp=(props)=>{
    let nav = useNavigate();
    const {username} = useParams();

    const LocalStorageItem = localStorage.getItem("Uid");
    const LogoutFn=()=>{
        localStorage.clear();
        return nav("/login");
    };
    console.log(LocalStorageItem);
    if (LocalStorageItem != null || LocalStorageItem != undefined ) {
        return(
            <div className="Sidebar">
                <ul className="MainNav">
                    <li onClick={()=>nav("/")}><h2>Home</h2></li>
                    <li onClick={()=>nav("/aboutperuzor")}><h2>About</h2></li>
                </ul>
                <ul className="AuthNav">
                    <li onClick={LogoutFn}><h2>Logout</h2></li>
                </ul>
            </div>
        );
    }else{
        return(
            <div className="Sidebar">
                <ul className="MainNav">
                    <li onClick={()=>nav("/")}><h2>Home</h2></li>
                    <li onClick={()=>nav("/aboutperuzor")}><h2>About</h2></li>
                </ul>
                <ul className="AuthNav">
                    <li onClick={()=>nav("login")}><h2>Login</h2></li>
                </ul>
            </div>
        );
    };
    
};

export default NavbarComp;