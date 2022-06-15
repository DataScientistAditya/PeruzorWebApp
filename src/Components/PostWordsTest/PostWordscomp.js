import React,{useRef,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
import { useSpeechSynthesis } from "react-speech-kit";
import FinalResultSentencePopUpComp from "../Popups.js/FinalPopupSentence";
import ResultPopUpComp from "../Popups.js/ResultPopup";
import PopUpcomp from "../Popups.js/Popups";
import { format } from "react-string-format";


const PostWordsComp=()=>{
    const [WordShow, SetWordShow] = useState("");
    const [WordsSpelled, SetWordsSpeeled] = useState("");
    const [IsMicrophonPopUp, SetMicrophonePopUp] = useState(false);
    //const [isInputConfirmed, SetInputConfirmed] = useState(false);
    const [isPopUpDisplay, SetDisplayPopUp] = useState({ visibility: "hidden" });
    //const [Content,SetContent] = useState("");
    const [isStartButton, SetStartButton] = useState({ visibility: "visible" });
    const [FinalResultPopupDisplay,SetFinalResultPopupDisplay] = useState({visibility:"hidden"});
    const [ResultPopupDisplay, SetResultPopupDisplay] = useState({ visibility: "hidden" });
    const [isSpeech, SetDisplaySpeech] = useState({ visibility: "hidden" });
    const [TestType,SetTestType] = useState("");
    const [WordList,SetWordList] = useState([]);
    const [ComapletedList,SetCompletedList] = useState([]);
    const styleShowonspeech = {width:"50%", height:"70px", left:"25%"};
    const [isVisibilityWait,SetWaitVisibility] =useState({ visibility: "visible" });
    const [isStart,SetStart] = useState(false);
    const [counter, setCounter] = useState(5);

    const {username} =useParams();
    let nav = useNavigate();
    const countRef = useRef(0);
    const { speak } = useSpeechSynthesis();
    const IndexCounter = useRef(0);

    const UpdateList=(elemnts)=>{
        SetCompletedList(arr=>[...arr,elemnts])
    };
    async function GetUserSentenceTestScore(){
        const UserData={
            Uid:username,
            TestType:"PostTest"
        };

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const SentenceApiResp = await fetch('https://iamadityachakraborty.pythonanywhere.com/GetSentenceTestScore',{
            method:"POST",
            body:JSON.stringify(UserData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (SentenceApiResp.ok) {
            const ApiResponse = await SentenceApiResp.json().then(
                (Resp)=>{
                    SetWordList(Resp.DataList);
                    SetTestType(Resp.type)
                }
            )
        }
        else{
            nav("/Sentencetest/"+ username);
        }
    }


    useEffect(()=>{
        GetUserSentenceTestScore();
    },[WordList.length])


    function PassAudioText(data) {
        SetDisplayPopUp({ visibility: "visible" });
        SetWordsSpeeled(data);
        UpdateList(data);
        if (WordShow === data) {
            countRef.current++;
        };
        
    };

    let ShowingWords = "";
    const NextClicked = () => {
        if (isStart) {
            SetStart(false);
            if (IndexCounter.current >0) {
                SetWaitVisibility({ visibility: "hidden" });
            };
            ShowingWords = WordList[IndexCounter.current];
            if (IndexCounter.current <= WordList.length) {
                SetWordShow(ShowingWords);
                SetResultPopupDisplay({ visibility: "hidden" });
                IndexCounter.current++;
                SetStart(true);
                console.log(ComapletedList);
                //console.log(UnmatchedList);

            };
            if (IndexCounter.current == WordList.length +1) {
                SetFinalResultPopupDisplay({visibility:"visible"});
                SetDisplaySpeech({visibility:"hidden"});
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
        },5000);
        
        return () => clearTimeout(Timer);
    },[isStart])

    const RecordingPopup = () => {
        SetMicrophonePopUp(true);
        return SetDisplaySpeech({ visibility: "visible" });
    };
    let RecordingPopUps = <p > </p>;
    if (IsMicrophonPopUp) {
        RecordingPopUps = <SpeechRecognitionsComp SubmitText = { PassAudioText } StoryShow={WordShow} size={{fontSize:"20px"}} Storyshowonmice={styleShowonspeech} Isdisabled="disabled" ShowingTrans={{visibility:"hidden"}}> </SpeechRecognitionsComp>;

    };
    async function WordsPretestScoreSubmit(){
        const WordsTest={
            Uid:username,
            Score:countRef.current,
            Level:TestType,
        };

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const SendData = await fetch('https://iamadityachakraborty.pythonanywhere.com/PostWordsTestScore',{
            method:"POST",
            body:JSON.stringify(WordsTest),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (SendData.ok) {
            const RespSendData = await SendData.json().then(
                (Resp)=>{
                    nav("/Poststories/"+ username);
                }
            )
        }
        
    };

    const NextTest=()=>{
        WordsPretestScoreSubmit();
    };



    const speech = new SpeechSynthesisUtterance();
    const Say = (Text) => {
        
        speech.text = Text;
        speech.lang = "en-US" ;
        //this.setState({ isSpeeking: true });
        window.speechSynthesis.speak(speech);
      };
    
    useEffect(()=>{
        Say("You will be showned Few Words back to back, in a span of 5 seconds, Please click on the button to start the test");
    },[]);

    useEffect(()=>{
        if (isStart) {
            counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
        }
    },[isStart,counter]);
    
    return(
        <div className = "SentencesShow" >
        <div className="FinalPopUpResult" style={FinalResultPopupDisplay}>
            <FinalResultSentencePopUpComp  NextTest={NextTest} ></FinalResultSentencePopUpComp>
        </div>
        <div className = "SentencePopUpResult" style = { ResultPopupDisplay } >
            <ResultPopUpComp score = { countRef.current } TillNow = { WordList.length }Nextletter = { NextClicked } > </ResultPopUpComp> 
        </div>
        <div className = "SentencesStartScreen" style = {isStartButton } >
        <div className="SentenceStartscrrencontains" style={{position:"relative",width:"100%",height:"60%",marginTop:"20%"}}>
            <p style = {{ color: "white", fontSize: "12px" }} > Note: You will be showned Few Words back to back, </p> 
            <p style = {{ color: "white", fontSize: "12px" }} > in a span of 5 seconds </p>
            <p> Please click on the button to start the test </p>
            <div className = "SentenceInstructions">
                    <button onClick = {() => speak({ text: "You will be showned Few Words back to back, in a span of 5 seconds, Please click on the button to start the test" })} className = "SpeakerInstructions" > <i className = "fas fa-volume-up" > </i></button>
            </div>
            <button onClick = { timer } > Start </button> 
         </div> 
         </div>
         <div className = "SentencesSpeechcontainer" style = { isSpeech } >
            { RecordingPopUps } 
        </div> 
        <p> Read Words as appear below using microphone </p> 
        <p style={isVisibilityWait}> Wait for {counter} seconds to Appear the Text on Screen </p> 
        <div className = "Sentencescontainer" >

            <ul className = "SentencessUl" >
                <div className = "Sentences" > 
                    <h4> { WordShow } </h4>
                </div> 
            </ul>
            <ul className = "Sentencespeakerul" >
                <div className = "SentenceSpeakerContainer">
                    <button onClick = {() => speak({ text: WordShow})} className = "SpeakerButtonbtn" > <i className = "fas fa-volume-up" > </i></button>
        </div></ul >
        </div>
        <div className = "SentenceMicroPhoneContainer" >
            <button className = "SentenceMicrophone" onClick = { RecordingPopup } >  <i className = "fas fa-microphone"> </i></button >
        </div>
    </div>
    );
}

export default PostWordsComp;