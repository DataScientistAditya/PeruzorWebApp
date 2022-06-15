import React, { useState, useRef, useEffect } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
import PopUpcomp from "../Popups.js/Popups";
import ResultPopUpComp from "../Popups.js/ResultPopup";
import FinalResultSentencePopUpComp from "../Popups.js/FinalPopupSentence";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { format } from "react-string-format";

const PostSentencesShowComp = () => {
    const [SentenceShow, SetSentencesShow] = useState("");
    const [lettersSpelled, SetSentenceSpeeled] = useState("");
    const [SentenceDiffrence, SetSentenceDiffrence] = useState([]);
    const [IsMicrophonPopUp, SetMicrophonePopUp] = useState(false);
    //const [isInputConfirmed, SetInputConfirmed] = useState(false);
    const [isPopUpDisplay, SetDisplayPopUp] = useState({ visibility: "hidden" });
    const [isSpeech, SetDisplaySpeech] = useState({ visibility: "hidden" });
    const [isStartButton, SetStartButton] = useState({ visibility: "visible" });
    //const [isResultPopup,SetIsResultpopup] = useState(false);
    //const [isTestOver,SetTestOver] = useState(false);
    const [FinalResultPopupDisplay,SetFinalResultPopupDisplay] = useState({visibility:"hidden"});
    const [ResultPopupDisplay, SetResultPopupDisplay] = useState({ visibility: "hidden" });
    const [UnmatchedList,SetUnmatchedList] = useState([]);
    const countRef = useRef(0);
    const IndexCounter = useRef(0);
    const { speak } = useSpeechSynthesis();
    const [isStart,SetStart] = useState(false);
    const [isVisibilityWait,SetWaitVisibility] =useState({ visibility: "visible" });
    const [counter, setCounter] = useState(10);

    const DispalySentences = ["I can play with the bat and ball here.", "The three boys like to walk to the bus stop.",
        "We are sleeping. We woke up late and we are very tired.", "Mother and father work from home. They help people and tell them what to do. Some of them left their houses very early.",
        "Sometimes we need to place animals into groups of same and different. Together, we must write the important ones on the same list."
    ]
    const {username} =useParams();
    let nav = useNavigate();
    const UpdateUnmatchedList=(elemnts)=>{
        SetUnmatchedList(arr=>[...arr,elemnts])
    };

    //User Entryfrom Microphone Recieved
    async function SubmitHandler(Data) {
        //event.preventDefault();
        const SentenceSubmitData = {
            SpelledSentence: Data,
            index: IndexCounter.current
        };
        //console.log(FormSubmitData);

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const Response = await fetch('https://iamadityachakraborty.pythonanywhere.com/CompareSentences', {
            method: "POST",
            body: JSON.stringify(SentenceSubmitData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (Response.ok) {

            const ResponseData = await Response.json().then((Resp) => {
                SetSentenceDiffrence(Resp.Unmatched);
                console.log(SentenceDiffrence);
                if (Resp.Unmatched === "None") {
                    countRef.current++;
                };

                UpdateUnmatchedList(Resp.Unmatched);
            });

        };
    };

    function PassAudioText(data) {
        SetDisplayPopUp({ visibility: "visible" });
        
        SubmitHandler(data);
        SetSentenceSpeeled(data);
        
    };
    //User Entryfrom Microphone Recieved End

    let ShowingSenctence = ""
    const NextClicked = () => {

        if (isStart) {
            ShowingSenctence = DispalySentences[IndexCounter.current];
            SetStart(false);
            if (IndexCounter.current >0) {
                SetWaitVisibility({ visibility: "hidden" });
            };
            if (IndexCounter.current <= DispalySentences.length) {
                SetSentencesShow(ShowingSenctence);
                SetResultPopupDisplay({ visibility: "hidden" });
                IndexCounter.current++;
                SetStart(true);
                console.log(UnmatchedList);

            };
            if (IndexCounter.current == DispalySentences.length + 1) {
                SetFinalResultPopupDisplay({visibility:"visible"});
                SetDisplaySpeech({visibility:"visible"});
            };
        }
        
    };


    const timer =()=>{
        SetStartButton({visibility:"hidden"});
        SetStart(true);
    } ;
    
   
    useEffect(()=>{
        const Timer = setTimeout(()=>{
            NextClicked();
        },10000);
        
        return () => clearTimeout(Timer);
    },[isStart])

    let RecordingPopUps = <p > </p>;
        //Setting Microphone Popup
    const RecordingPopup = () => {
        SetMicrophonePopUp(true);
        return SetDisplaySpeech({ visibility: "visible" });
    };
    if (IsMicrophonPopUp) {
        RecordingPopUps = <SpeechRecognitionsComp SubmitText = { PassAudioText } StoryShow={SentenceShow} size={{fontSize:"12px"}} Isdisabled="disabled" ShowingTrans={{visibility:"hidden"}}> </SpeechRecognitionsComp>;

    };
    //End Microphone Popup

    async function SentencePretestScoreSubmit(){
        const SentenceTest={
            Uid:username,
            Score:countRef.current
        };
        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const SendData = await fetch('https://iamadityachakraborty.pythonanywhere.com/PostSentenceTestScore',{
            method:"POST",
            body:JSON.stringify(SentenceTest),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (SendData.ok) {
            const RespSendData = await SendData.json().then(
                (Resp)=>{
                    nav("/Postwords/"+ username);
                }
            )
        }
        
    };

    const NextTest=()=>{
        SentencePretestScoreSubmit();
    };

    const speech = new SpeechSynthesisUtterance();
    const Say = (Text) => {
        
        speech.text = Text;
        speech.lang = "en-US" ;
        //this.setState({ isSpeeking: true });
        window.speechSynthesis.speak(speech);
      };
    
    useEffect(()=>{
        Say("Showing 5 Sentences back to back, in a span of 10 seconds, Please click on the button to start the test");
    },[]);
    
    useEffect(()=>{
        if (isStart) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    },[isStart,counter]);


    return ( 
    <div className = "SentencesShow" >
        <div className="FinalPopUpResult" style={FinalResultPopupDisplay}>
            <FinalResultSentencePopUpComp  NextTest={NextTest}></FinalResultSentencePopUpComp>
        </div>
        <div className = "SentencePopUpResult" style = { ResultPopupDisplay } >
            <ResultPopUpComp score = { countRef.current } TillNow = { DispalySentences.length }Nextletter = { NextClicked } > </ResultPopUpComp> 
        </div>
        <div className = "SentencesStartScreen" style = {isStartButton } >
        <div className="SentenceStartscrrencontains" style={{position:"relative",width:"100%",height:"60%",marginTop:"20%"}}>
            <p style = {{ color: "white", fontSize: "12px" }} > Note: Showing 5 Sentences back to back, </p> 
            <p style = {{ color: "white", fontSize: "12px" }} > in a span of 10 seconds </p>
            <p> Please click on the button to start the test </p>
            <div className = "SentenceInstructions">
                    <button onClick = {() => speak({ text: "Showing 5 Sentences back to back, in a span of 10 seconds, Please click on the button to start the test" })} className = "SpeakerInstructions" > <i className = "fas fa-volume-up" > </i></button>
            </div>
            <button onClick = { timer } > Start </button> 
        </div>
        </div> 
        <div className = "SentencesSpeechcontainer" style = { isSpeech } >
            { RecordingPopUps } 
        </div> 
        <p> Read sentence as appear below using microphone </p> 
        <p style={isVisibilityWait}> Wait for {counter} seconds to Appear the Text on Screen </p> 
        <div className = "Sentencescontainer" >

            <ul className = "SentencessUl" >
                <div className = "Sentences" > 
                    <p style = {{ fontSize: "18px", fontFamily: "sans-serif" }}> { SentenceShow } </p>
                </div> 
            </ul>
            <ul className = "Sentencespeakerul" >
                <div className = "SentenceSpeakerContainer">
                    <button onClick = {() => speak({ text: SentenceShow })} className = "SpeakerButtonbtn" > <i className = "fas fa-volume-up" > </i></button>
        </div></ul >
        </div>
        <div className = "SentenceMicroPhoneContainer" >
            <button className = "SentenceMicrophone" onClick = { RecordingPopup } >  <i className = "fas fa-microphone"> </i></button >
        </div>
    </div>
    );
}

export default PostSentencesShowComp;