import React,{useState,useEffect} from "react";
import "./Pretest.css";
//import ComputerGeneratedProp from "./PretestComp";
import PretestChatBotComp from "./PretestChatbotcomp";
import LogoutComp from "../Logout/Logout";
import { useNavigate } from "react-router-dom";
import { browserName,CustomView } from "react-device-detect";


const PretestPage=(props)=>{
    let nav = useNavigate();
    const LocalStorageItem = localStorage.getItem("Uid");
    const [isChecked,SetChecked] = useState(false);
    const [isVoiceEnabled,SetVoiceEnabled] = useState({visibility:"visible"});
    const [BotsayingChnage,SetBotSayingChange] = useState("");

    const HandleBotSaying=(Botsaying)=>{
        SetBotSayingChange(Botsaying) ;
    };
    const speech = new SpeechSynthesisUtterance();
    const speak = () => {
        speech.text = "Hi, You Will be Asked to Enter Your Name and Country, Use Microphone to Answer, Please Mention Only Your Name and Country";
        speech.lang = "en-US" ;
        //this.setState({ isSpeeking: true });
        window.speechSynthesis.speak(speech);
    };
    const speakbotsaying = (Text) => {
        speech.text = Text;
        speech.lang = "en-US" ;
        //this.setState({ isSpeeking: true });
        window.speechSynthesis.speak(speech);
    };

    const HandleChacked=()=>{
        SetChecked(true);
        speak();
        speakbotsaying(BotsayingChnage);
        SetVoiceEnabled({visibility:"hidden"});
    };
    
    //For other Browsers
    useEffect(()=>{
        speak();
        
    },[]);



   if (LocalStorageItem !== null) {
        return(
            <div id="Pretest">
                <div id="Bg">
                </div>
                <LogoutComp></LogoutComp>
                <CustomView condition={browserName ==="Chrome"}>
                    <div className="Container">
                        <div className="switch-holder">
                                <div className="switch-label">
                                <span>Voice</span>
                                </div>
                                <div className="switch-toggle">
                                    <input type="checkbox" id="bluetooth" checked={isChecked} onChange={HandleChacked}/>
                                    <label for="bluetooth"></label>
                                </div>
                        </div>
                    </div>
                </CustomView>
                <CustomView condition={browserName ==="Chrome"}>
                        <div className="Notes" style={isVoiceEnabled}>
                            <p>warning: Please Turn the voice Assistant On, for using the Application</p>
                        </div>
                </CustomView>
                <div id="PretestGroup">
                   <PretestChatBotComp BotSayingData={HandleBotSaying} ></PretestChatBotComp>
                </div>
            </div>
        );
    }
    else{
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

export default PretestPage;
