import React from "react";
import "./Sentences.css";
import SentencesShowComp from "./SentencesComp";
import LogoutComp from "../Logout/Logout";
import { useNavigate } from "react-router-dom";

const SentencesPage=()=>{
    let nav = useNavigate();
    const LocalStorageItem = localStorage.getItem("Uid");

    if (LocalStorageItem !== null) {
        return(
            <div id="Pretest">
                
                <div id="Bg">
                </div>
                <LogoutComp></LogoutComp>
                <div id="PretestGroup">
                    <SentencesShowComp></SentencesShowComp>
                </div>
            </div>
        );
    }else{
        return (
            <div className="notfoundcontainer" style={{width:"100%", height:"100%",background:"black",textAlign:"center",position:"absolute"}}>
                <div className="notfound textcontainer" style={{position:"absolute",width:"50%",height:"40%",top:"30%",left:"25%"}}>
                    <h1 style={{fontSize:"95px"}}>404</h1>
                    <p>You are not logged in</p><a style={{textDecoration:"none",cursor:"pointer"}} onClick={()=>nav("/login")}>Login</a>
                </div>
            </div>
        );
    }
    
}

export default SentencesPage;