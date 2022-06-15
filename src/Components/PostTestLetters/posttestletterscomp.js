import React, { useState,useRef,useEffect} from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
import PopUpcomp from "../Popups.js/Popups";
import ResultPopUpComp from "../Popups.js/ResultPopup";
import { useNavigate } from "react-router-dom";
import FinalResultPopUpComp from "../Popups.js/FinalPopup";
import { useParams } from "react-router-dom";
import { format } from "react-string-format";


const PostTestLetterShowComp=()=>{
    const [lettersShow,SetLettersShow] = useState(""); 
    const [lettersSpelled,SetLettersSpeeled] = useState("");
    const [IsMicrophonPopUp,SetMicrophonePopUp] = useState(false);
    //const [isInputConfirmed,SetInputConfirmed] = useState(false);
    const [isPopUpDisplay,SetDisplayPopUp] = useState({visibility:"hidden"});
    const [isSpeech,SetDisplaySpeech] = useState({visibility:"hidden"});
    const [isStartButton,SetStartButton] = useState({visibility:"visible"});
    //const [isResultPopup,SetIsResultpopup] = useState(false);
    const [ResultPopupDisplay,SetResultPopupDisplay] = useState({visibility:"hidden"});
    const [FinalResultPopupDisplay,SetFinalResultPopupDisplay] = useState({visibility:"hidden"});
    //const [NavigateNextTest,SetNavigateNextTest] = useState(false);
    const [Ltters,SetLetters]=useState([]);
    const styleShowonspeech = {width:"20%", height:"65px", left:"40%"};
    const [counter, setCounter] = useState(5);
    const [isStart,SetStart] = useState(false);
    const [isVisibilityWait,SetWaitVisibility] =useState({ visibility: "visible" });


    const Letters = ["A","D","E","V","G","H","J","F","R","K","M","I","N","B","C","O","P","Q","S","L","T","X","Y","Z","U","W"]
    const countRef = useRef(0);
    const Indexcounter = useRef(0);
    const {speak} = useSpeechSynthesis();
    let nav = useNavigate();
    let RecordingPopUps=<p></p>;
    const {username} = useParams();



    //User Entryfrom Microphone Recieved
    function PassAudioText(data){
        SetDisplayPopUp({visibility:"visible"});
        Updatelist(data);
        if (String(lettersShow) === "Y") {
            if(String(data).toUpperCase()==="WHY"){
                SetLettersSpeeled(data);
                return countRef.current++;
            }
        };
        if (String(lettersShow) === "U") {
            if(String(data).toUpperCase()==="YOU"){
                SetLettersSpeeled(data);
                return countRef.current++;
            }
        };
        if (String(lettersShow) === "K") {
            if(String(data).toUpperCase()==="KE"){
                SetLettersSpeeled(data);
                return countRef.current++;
            }
        };
        if (String(lettersShow) === "Y") {
            if(String(data).toUpperCase()==="WHY"){
                SetLettersSpeeled(data);
                return countRef.current++;
            }
        };
        if (String(lettersShow) === "J") {
            if(String(data).toUpperCase()==="JAY"){
                SetLettersSpeeled(data);
                return countRef.current++;
            }
        };
        if (String(lettersShow) === String(data).toUpperCase()) {
            console.log("Checking Resut");
            console.log(countRef.current);
            SetLettersSpeeled(data);
            return countRef.current++;
        };
        SetLettersSpeeled(data);
        console.log(countRef.current);
        
    };
    //User Entryfrom Microphone Recieved End

    const Updatelist =(elems)=>{
        SetLetters(arr=>[...arr,elems])
    };
    //let letters= [];
    const NextClicked=()=>{
        if (isStart) {
            SetStart(false);
            if (Indexcounter.current >0) {
                SetWaitVisibility({ visibility: "hidden" })
            };
            if (Indexcounter.current<=Letters.length) {
                if (Indexcounter.current==Letters.length) {
                    SetFinalResultPopupDisplay({visibility:"visible"});
                    SetDisplaySpeech({visibility:"hidden"});
                };
                SetLettersShow(Letters[Indexcounter.current]);
                console.log(Ltters);
                SetResultPopupDisplay({visibility:"hidden"});
                Indexcounter.current++;
                SetStart(true);
            };
        };
        
    };

    const timer =()=>{
        SetStartButton({visibility:"hidden"});
        SetStart(true);
    } ;
    
    useEffect(()=>{
        const Timer = setTimeout(()=>{
            NextClicked();
        },5000);
        return () => clearTimeout(Timer);
    },[isStart])


  
    //Setting Microphone Popup
    const RecordingPopup=()=>{
        SetMicrophonePopUp(true);
        return SetDisplaySpeech({visibility:"visible"});
    };
    if (IsMicrophonPopUp) {
        RecordingPopUps = <SpeechRecognitionsComp SubmitText={PassAudioText} StoryShow={lettersShow} size={{fontSize:"20px"}} Storyshowonmice={styleShowonspeech} ShowingTrans={{visibility:"hidden"}} Isdisabled="disabled"></SpeechRecognitionsComp>;
        
    };
    //End Microphone Popup

    
    async function LetterPretestScoreSubmit(){
        const LettersTest={
            Uid:username,
            Score:countRef.current
        };

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build //LetterTestScore
        const SendData = await fetch('https://iamadityachakraborty.pythonanywhere.com/PosttestletterScore',{
            method:"POST",
            body:JSON.stringify(LettersTest),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (SendData.ok) {
            const RespSendData = await SendData.json().then(
                (Resp)=>{
                    nav("/Postsentence/"+ username);
                }
            )
        }
        
    };

    const NextTest=()=>{
        LetterPretestScoreSubmit();
    };
    

    const speech = new SpeechSynthesisUtterance();
    const Say = (Text) => {
        
        speech.text = Text;
        speech.lang = "en-US" ;
        //this.setState({ isSpeeking: true });
        window.speechSynthesis.speak(speech);
      };
    
    useEffect(()=>{
        Say("Showing 26 letters back to back in a span of 5 seconds, Please click on the button to start the test");
        
    },[]);

    useEffect(()=>{
        if (isStart) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        };
    },[isStart,counter]);

    return(
        <div className="LettersShow" >
            <div className="FinalPopUpResult" style={FinalResultPopupDisplay}>
               <FinalResultPopUpComp NextTest={ NextTest}></FinalResultPopUpComp>
            </div>
            <div className="PopUpResult" style={ResultPopupDisplay}>
                <ResultPopUpComp   Prons={lettersSpelled.toUpperCase()} TextShow={lettersShow} score={countRef.current} TillNow={Ltters.length} Nextletter={NextClicked}></ResultPopUpComp>
            </div>
            <div className="StartScreen" style={isStartButton}>
            <div className="SentenceStartscrrencontains" style={{position:"relative",width:"100%",height:"60%",marginTop:"20%"}}>
                <p style={{color:"white",fontSize:"12px"}}>Note:Showing 26 letters back to back,</p>
                <p style={{color:"white",fontSize:"12px"}}>in a span of 5 seconds</p>
                
                <p>Please click on the button to start the test</p>
                <div className = "LetterInstructions">
                    <button onClick = {() => speak({ text: "Showing 26 letters back to back, first one will be for practice, where score will not be counted. Please click on the button to start the test" })} className = "LetterInstructionsBtn" > <i className = "fas fa-volume-up" > </i></button>
                </div>
                <button onClick={timer} >Start</button>
            </div>
            </div>
            <div className="Speechcontainer" style={isSpeech}>
                {RecordingPopUps}
            </div>
            <p>Read letters as appear below using microphone </p> 
            <p style={isVisibilityWait}> Wait for {counter} seconds to Appear the Text on Screen </p> 
            <div className="lettercontainer">
                
                <ul className="lettersUl"><div className="letters"><h4>{lettersShow}</h4></div></ul>
                <ul className="speakerul"><div className="SpeakerContainer">
                <button onClick={()=>speak({text:lettersShow })} className="SpeakerButtonbtn"><i className="fas fa-volume-up"></i></button>
                </div></ul>
            </div>
            <div className="MicroPhoneContainer">
                <button className="Microphone" onClick={RecordingPopup}><i className="fas fa-microphone" ></i></button>
            </div>
        </div>
    );
}

export default PostTestLetterShowComp;