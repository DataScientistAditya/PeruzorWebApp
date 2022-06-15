import React, { useState, useEffect } from "react";
import "./PretestComp.css";
//import useRecorder from "../SpeechRecognitionComp/UseRecorder";
import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
//import PopUpcomp from "../Popups.js/Popups";
import { useSpeechSynthesis } from 'react-speech-kit';
import { useNavigate } from "react-router-dom";
import { format } from "react-string-format";
import { useParams } from "react-router-dom";



const PretestChatBotComp=(props)=>{

    const [name,SetName] = useState("");
    const [country,SetCountry] = useState("");
    const [IsMicrophonPopUp,SetMicrophonePopUp] = useState(false);
    //const [isEnableVoice,SetEnableVoice] = useState(false);
    const [warning,SetWarning] = useState("");
    const [BotSyaing,SetBotSaying] = useState("");
    //const [ReplayContent,SetReplayContent] = useState([]);
    const [IsWarning, SeIstWarning] = useState({color:"yellow",visibility:"hidden"});
    const [isVisible,SetisVisible] =useState({visibility:"visible"});
    const [PopContainerVisibility,SetPopUpContainerVisibility] = useState({visibility:"hidden"})
    const [isAllEntry,SetAllEntry]  = useState(false);
    const [isIntroOver,SetIntroOver] = useState(false);
    const [isDisable,SetDisable] = useState("disabled");
    

    let Warning =<p style={IsWarning}><i className="fas fa-exclamation-triangle" style={{color:"#FF8C00"}}></i> Didnt Come Up What You had Submited? please try with recording Audio and stop it before submitting or resubmit it</p>;

    let RecordingPopUps = <p></p>
    let BotSays = "";
    let nav = useNavigate();
    const {username} = useParams();

    const RecordingPopup=()=>{
         SetMicrophonePopUp(true);
         SetPopUpContainerVisibility({visibility:"visible"});
    };

    function PassAudioText(data){
        //SetWarning({color:"#FF8C00",visibility:"visible"});
        if (data=="") {
            return SeIstWarning(Warning);
        };
        let StringValue = data.toString();
        let StringList = StringValue.split(" ");
        if (StringList.length>1) {
            return SetWarning("Please Use only your Name as Input");
        };
        if (name=="") {
            SetName(data);
            //console.log(data);
            if (StringList.length==1) {
                SetMicrophonePopUp(false);
                SetPopUpContainerVisibility({visibility:"hidden"});
                return SetBotSaying(format("Hi {0}, I am from Jamaica. Where are you from?",data))
            };
            
        };

        if (country=="") {
            SetName(data);
            console.log(data);
            if (StringList.length==1) {
                SetMicrophonePopUp(false);
                SetPopUpContainerVisibility({visibility:"hidden"});
                SetAllEntry(true);
                return SetBotSaying(format("{0}, You will be doing a Reading Assessment. That includes; identifying letter names and sounds, identifying sight words, reading one or more stories and then answering some questions. This is not a pass or fail kind of test so relax and do your best and wait for the Test Screen appear. Thank you",name))
            };
            
        };
    };


    if (IsMicrophonPopUp) {
        RecordingPopUps = <SpeechRecognitionsComp SubmitText={PassAudioText}></SpeechRecognitionsComp>;
        
    };

    const speech = new SpeechSynthesisUtterance();
    const speak = (Text) => {
        speech.text = Text;
        speech.lang = "en-US" ;
        //this.setState({ isSpeeking: true });
        window.speechSynthesis.speak(speech);
    };
    
    //format("{0}{1}, You will be doing a Reading Assessment. That includes; identifying letter names and sounds, identifying sight words, reading one or more stories and then answering some questions. This is not a pass or fail kind of test so relax and do your best and wait for the Test Screen appear. Thank you",name)
    useEffect(()=>{
        const timer = setTimeout(() => {
            SetisVisible({visibility:"hidden"});
            SetBotSaying("Hi, I am Alex. What is your name ?");
            SetDisable("");
          }, 10000);
          return () => clearTimeout(timer);
    },[]);


    useEffect(()=>{
        speak(BotSyaing);
        props.BotSayingData(BotSyaing);
    },[BotSyaing])


    if (isAllEntry) {
        setInterval(() => {
            SetIntroOver(true);
        }, 30000);
    };

    if (isIntroOver) {
        nav("/letters-pretest/" + username);
    }

    return(
        <div className="ContentArea">
                <div className="AlertText" style={isVisible}>
                    <p>Note:Please mention only your name and country, when asked.</p>
                </div>
            <div className="Recordingpops" style={PopContainerVisibility}>
                <p style={{textAlign:"center",color:"red"}}>{warning}</p>
                {RecordingPopUps}
            </div>
            <div className="TextOutputContainer">
            <p>{BotSyaing}</p>
            </div>
            <div className="MicrophoneContainer">
                <button className="Microphone_Starts" onClick={RecordingPopup} disabled={isDisable} ><i className="fas fa-microphone" ></i></button>
            </div>
        </div>
    );
}

export default PretestChatBotComp;