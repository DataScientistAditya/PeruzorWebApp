import React from "react";
import "./Notfound.css";
import { useNavigate } from "react-router-dom";


const Notfoundpage=()=>{
    let nav = useNavigate();
    const RoutetoLogin=()=>{
        return nav("/login");
    }
    return(
        <div class="mainbox">
            <div class="err">4
            </div>
            <i class="far fa-question-circle fa-spin"></i>
            <div class="err2">4
            </div>
            <div class="msg">Page Not exists<p>Let's go <a onClick={RoutetoLogin}>home</a> and try from there.</p>
            </div>
        </div>
    );
}

export default Notfoundpage;