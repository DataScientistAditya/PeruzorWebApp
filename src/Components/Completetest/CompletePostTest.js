import React,{useContext,useState} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import LogoutComp from "../Logout/Logout";
import Authusercontext from "../AuthContext/Authcontext";
import TestResultComp from "../Popups.js/TestResult";

const CompletePostTestPage=()=>{
    const {username} =useParams();
    let nav = useNavigate();
    const ContextAuth = useContext(Authusercontext);
    const [PreResults,SetPreResult] = useState([]);
    const [ResultPopup,SetResultpopup] = useState(false);
    const [popupvisibility,SetPopupvisibility] = useState({visibility:"hidden"});

    const LocalStorageItem = localStorage.getItem("Uid");

    async function RequestRetake(){
        const UserData={
            Uid:username,
        };

        const SentenceApiResp = await fetch("https://iamadityachakraborty.pythonanywhere.com/PostTestRetake",{
            method:"POST",
            body:JSON.stringify(UserData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (SentenceApiResp.ok) {
            const ApiResponse = await SentenceApiResp.json().then(
                (Resp)=>{
                    nav("/startTest/" + username);
                }
            )
        }
    };

    async function FetchScores(){
        const UserData={
            Uid:username,
        };
        const PretestResultResp = await fetch("https://iamadityachakraborty.pythonanywhere.com/PosttestResults",{
            method:"POST",
            body:JSON.stringify(UserData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (PretestResultResp.ok) {
            const ResultRespData = await PretestResultResp.json().then(
                (Resp)=>{
                    return Resp;
                }
            );

            SetPreResult(ResultRespData);
            SetResultpopup(true);
            SetPopupvisibility({visibility:"visible"});
            //console.log(PreResults);

            
        };

    };
    const ClosePops =()=>{
        SetResultpopup(false);
        SetPopupvisibility({visibility:"hidden"});
    };

    let Content = <p></p>;
    if (ResultPopup) {
        Content = <TestResultComp Letters = {PreResults[0][0].Letters} 
        Sentences = {PreResults[0][1].Sentence} Words = {PreResults[0][2].Words} 
        Story = {PreResults[0][3].Story} Missing = {PreResults[0][4].StoryMissing}
        ClosePopup = {ClosePops} Visibility={popupvisibility} >
        </TestResultComp>
    }; 



    if (LocalStorageItem != null) {
        return(

            <div id="Pretest">
                
            <div id="Bg">
            </div>
            <div id="PretestGroup" style={{textAlign:"center",fontFamily:"impact"}}>
                {Content}
                <h2 style={{fontSize:"22px",marginTop:"10px"}}>Your test is Over</h2>
                <p style={{fontSize:"18px",marginTop:"10px"}}>Click Here to see your <a onClick={FetchScores} style={{textDecoration:"none",fontSize:"20px",color:"black",cursor:"pointer"}}>Result</a></p>
                <p style={{fontSize:"18px",marginTop:"10px"}}>Do you want to Retake?</p>
                <button className="YesButton" onClick={RequestRetake} style={{padding:"2% 6%",backgroundColor:"black",border:"2px solid",borderColor:"white",borderRadius:"10px", color:"white",marginTop:"5px"}}>Retake</button>
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

export default CompletePostTestPage;