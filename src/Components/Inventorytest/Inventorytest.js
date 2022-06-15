import React,{useContext} from "react";
import InventoryTestPageComp from "./Inventorytestcomp";
//import LogoutComp from "../Logout/Logout";
//import Authusercontext from "../AuthContext/Authcontext";
import { useNavigate } from "react-router-dom";



const InventorytestPage=()=>{
    let nav = useNavigate();
    //const ContextAuth = useContext(Authusercontext);
    const LocalStorageItem = localStorage.getItem("Uid")
    if (LocalStorageItem !== null) {
        return(
            <div id="Pretest">
                
                <div id="Bg">
                </div>
                <div id="PretestGroup">
                    <InventoryTestPageComp></InventoryTestPageComp>
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

export default InventorytestPage;