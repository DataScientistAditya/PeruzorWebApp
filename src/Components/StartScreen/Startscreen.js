import React,{useState, useContext} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
//import Authusercontext from "../AuthContext/Authcontext";
import "./StartScreen.css";
import LogoutComp from "../Logout/Logout";

const StartScreenPage=()=>{
    //const ContextAuth = useContext(Authusercontext);
    const [content,SetContent] = useState("");
    const {username} =useParams();
    let nav = useNavigate();
    const LocalStorageItem = localStorage.getItem("Uid");
    

    async function StarttestHandler(event){
        event.preventDefault();
        const StartScreenData={
            Uid: username,
        }

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const ApiResponse =await fetch('https://iamadityachakraborty.pythonanywhere.com/GetCompletedTest',{
            method:"POST",
            body:JSON.stringify(StartScreenData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (ApiResponse.ok) {
            const RespData = await ApiResponse.json().then(
                (Resp)=>{
                    //console.log(Resp);


                    if (Resp.TestPassed == "Pretest") {
                        if (LocalStorageItem!== null) {
                            return nav("/pretest/"+ Resp.Ud);
                        };
                      
                    };

                    if (Resp.TestPassed == "Letters") {

                        if (LocalStorageItem!== null) {
                            return nav("/Sentencetest/"+ Resp.Ud);
                        };
                       
                    };

                    if (Resp.TestPassed == "Sentence") {

                        if (LocalStorageItem!== null) {
                            return nav("/Words/"+ Resp.Ud);
                        };
                        
                        
                    };


                    if (Resp.TestPassed == "Words") {
                        if (LocalStorageItem!== null) {
                            return nav("/Stories/"+ Resp.Ud);
                        };
                    };


                    if (Resp.TestPassed == "Story") {
                        if (LocalStorageItem!== null) {
                            return nav("/TestOver/"+ Resp.Ud);
                        };
                        
                    };

                }
            )
            
        }
        else{
            //Should return 404 page
            SetContent("Username or Password is wrong or You have a Pending Verification")
        };
    };

    async function PostTest(event){
        event.preventDefault();
        const StartScreenData={
            Uid: username,
        }

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const ApiResponse =await fetch('https://iamadityachakraborty.pythonanywhere.com/GetCompletedPostTest',{
            method:"POST",
            body:JSON.stringify(StartScreenData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (ApiResponse.ok) {
            const RespData = await ApiResponse.json().then(
                (Resp)=>{
                    //console.log(Resp);
                    if (Resp.TestPassed == "PostLetters") {
                        if (LocalStorageItem!== null) {
                            return nav("/Postsentence/"+ Resp.Ud);
                        };
                        
                    };


                    if (Resp.TestPassed == "PostSentence") {
                        if (LocalStorageItem!== null) {
                            return nav("/Postwords/"+ Resp.Ud);
                        };
                        
                    };


                    if (Resp.TestPassed == "PostWords") {

                        if (LocalStorageItem!== null) {
                            return nav("/Poststories/"+ Resp.Ud);
                        };
                        
                    };


                    if (Resp.TestPassed == "PostStory") {
                        if (LocalStorageItem!== null) {
                            return nav("/TestOver/"+ Resp.Ud);
                        };
                    };

                    if (Resp.TestPassed == "PreStory") {
                        if (LocalStorageItem!== null) {
                            return nav("/Postestltrs/" + Resp.Ud);
                        };
                    };

                }
            )
            
        }
        else{
            //Should return 404 page
            SetContent("Username or Password is wrong or You have a Pending Verification")
        };
    };

    const InterestTest=()=>{
        console.log(LocalStorageItem);
        if (LocalStorageItem!== null) {
            return nav("/Quiz/"+ username);
            
        }else{
            return nav("/login");
        };

        
    };

    const Inventorytest=()=>{
        if (LocalStorageItem!== null) {
            return nav("/QuizInventory/"+ username);
        }else{
            return nav("/login");
        };
    };
    if (LocalStorageItem!== null) {
        console.log(LocalStorageItem)
        return(
            <div id="Pretest">
                
                <div id="Bg">
                </div>
                <div id="PretestGroup">
                    <div className="StartScreen">
                        <li><button className="StartPageButton" onClick={StarttestHandler}>Pre Test</button></li>
                        <li><button className="IntelligencePageButton" onClick={InterestTest}>Intelligence Test</button></li>
                        <li><button className="InventoryPageButton" onClick={Inventorytest}>Inventory Test</button></li>
                        <li><button className="PostTest" onClick={PostTest}>Post Test</button></li>
                    </div>
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

export default StartScreenPage;