import React,{useState,useRef,useEffect} from "react";
import { useSpeechSynthesis } from "react-speech-kit";
//import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
import PopUpcomp from "../Popups.js/Popups";
import InventoryPopUpComp from "../Popups.js/InventoryTestpopuo";
import { useNavigate } from "react-router-dom";
import IntelligenceResultSentencePopUpComp from "../Popups.js/IntellegenceResultComp";
import { useParams } from "react-router-dom";
import QuestionsForm from "../FormComps/QuestionsForm";



const InventoryTestPageComp=()=>{

    //const [SentenceShow, SetSentencesShow] = useState("");
    const [QuestionsList, SetQuestionsList] = useState([]);
    //const [IsMicrophonPopUp, SetMicrophonePopUp] = useState(false);
    const [isInputConfirmed, SetInputConfirmed] = useState(false);
    const [isPopUpDisplay, SetDisplayPopUp] = useState({ visibility: "hidden" });
    const [isSpeech, SetDisplaySpeech] = useState({ visibility: "hidden" });
    const [isStartButton, SetStartButton] = useState({ visibility: "visible" });
    //const [isResultPopup,SetIsResultpopup] = useState(false);
    //const [isTestOver,SetTestOver] = useState(false);
    const [FinalResultPopupDisplay,SetFinalResultPopupDisplay] = useState({visibility:"hidden"});
    const [ResultPopupDisplay, SetResultPopupDisplay] = useState({ visibility: "hidden" });
    const [AmswerList,SetAnswerList] = useState([]);
    const [Qsn,SetQsn] = useState();
    const [Ans1,SetAns1] =useState();
    const [Ans2,SetAns2] =useState();
    const [Ans3,SetAns3] =useState();
    const [AnswerInput,SetAnswerInput] = useState("Select");
    const [Err,SetErr] = useState("");
    const [IntRslt,SetIntRslt] = useState("");
    //const [CorrectAns,SetCorrectAns] =useState();

    const countRef = useRef(0);
    const IndexCounter = useRef(0);
    const { speak } = useSpeechSynthesis();
    const {username} =useParams();
    let nav = useNavigate();

    const UpdateAnswerList=(elemnts)=>{
        SetAnswerList(arr=>[...arr,elemnts])
    };

    //Intelligence Qsns Recieved
    async function SubmitHandler() {

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const Response = await fetch('https://iamadityachakraborty.pythonanywhere.com/GetInventoryQuestions');

        if (Response.ok) {

            const ResponseData = await Response.json().then((Resp) => {
                SetQuestionsList(Resp.intslist);
            });

        };
    };

    //To get Intelligence test Result
    async function IntelligenceScoreSubmit(){
        const SentenceTest={
            Uid:username,
            AnswerList:AmswerList
        };
        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const SendData = await fetch('https://iamadityachakraborty.pythonanywhere.com/SendInventoryResult',{
            method:"POST",
            body:JSON.stringify(SentenceTest),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (SendData.ok) {
            const RespSendData = await SendData.json().then(
                (Resp)=>{
                    SetIntRslt(Resp.Character);
                    SetFinalResultPopupDisplay({visibility:"visible"});
                    console.log(AmswerList);

                }
            )
        }
        
    };

    const AnswerInputHandler=(event)=>{
        SetAnswerInput(event.target.value);
    };
    const AnswerUpdateHandler=()=>{
        if (AnswerInput != "Select") {
            UpdateAnswerList(AnswerInput);
            SetResultPopupDisplay({ visibility: "visible" });
            console.log(AmswerList);
        }else{
            SetErr("Please Select a valid answer")
        };
    };
    const NextClicked = () => {
        SetResultPopupDisplay({ visibility: "hidden" });
        if (AmswerList.length==QuestionsList.length) {
            return IntelligenceScoreSubmit();
        };
        if (IndexCounter.current<=QuestionsList.length-1) {
            SetQsn(QuestionsList[IndexCounter.current].Question);
            SetAns1(QuestionsList[IndexCounter.current].Answer1);
            SetAns2(QuestionsList[IndexCounter.current].Answer2);
            SetAns3(QuestionsList[IndexCounter.current].Answer3);
            IndexCounter.current++;
        };
    };


       //Input Confirmed
       const InputConfirmed = () => {
        SetInputConfirmed(true);
        SetDisplaySpeech({ visibility: "hidden" });
        SetResultPopupDisplay({ visibility: "visible" });
        return SetDisplayPopUp({ visibility: "hidden" });
    };
    //End Input Confirmed
    //Input Cencelled
    const InputCanceled = () => {
            SetInputConfirmed(false);
            SetDisplaySpeech({ visibility: "hidden" });
            return SetDisplayPopUp({ visibility: "hidden" });
    }
    //End Input Cancelled


    const AssigningLetters = () => {
        SetStartButton({ visibility: "hidden" });
        SubmitHandler();
        SetResultPopupDisplay({ visibility: "visible" });
        //letters.push(Showingletter); 

    };

    const NextTest=()=>{
        nav("/startTest/"+ username);
    };

    const speech = new SpeechSynthesisUtterance();
    const Say = (Text) => {
        
        speech.text = Text;
        speech.lang = "en-US" ;
        //this.setState({ isSpeeking: true });
        window.speechSynthesis.speak(speech);
      };
    
    useEffect(()=>{
        let Text = "Please tell us more about the things you like by completing the Interest Inventory List, Click on the start button"
        Say(Text);
    },[]);

    useEffect(()=>{
        if (Qsn !== undefined) {
          Say(Qsn);  
        }
    },[Qsn]);


    return(
        <div className = "SentencesShow" >
        <div className="FinalPopUpResult" style={FinalResultPopupDisplay}>
            <IntelligenceResultSentencePopUpComp ResultFinal={IntRslt} NextTest={NextTest} ></IntelligenceResultSentencePopUpComp>
        </div>
        <div className = "SentencePopUpResult" style = { ResultPopupDisplay } >
            <InventoryPopUpComp  Nextletter = { NextClicked } > </InventoryPopUpComp> 
        </div>
        <div className = "SentencesStartScreen" style = {isStartButton } >
        <div className="SentenceStartscrrencontains" style={{position:"relative",width:"100%",height:"60%",marginTop:"20%"}}>
            <p style = {{ color: "white", fontSize: "12px" }} > Note: You will have a Inventory test, </p> 
            <p style = {{ color: "white", fontSize: "12px" }} > Click on the start button to start the test </p>
            <p> Please click on the button to start the test </p>
            <div className = "SentenceInstructions">
                    <button onClick = {() => speak({ text: "Please tell us more about the things you like by completing the Interest Inventory List, Click on the start button" })} className = "SpeakerInstructions" > <i className = "fas fa-volume-up" > </i></button>
            </div>
            <button onClick = { AssigningLetters } > Start </button> 
         </div> 
         </div>
         <div className = "SentencesSpeechcontainer" style = { isSpeech } >
            <PopUpcomp YesClicked = { InputConfirmed } NoClicked = { InputCanceled } Display = { isPopUpDisplay } > </PopUpcomp> 
        </div> 
        <p> Read the questions carefully then answer </p> 
        <div className = "Sentencescontainer" >

            <ul className = "SentencessUl" >
                <div className = "Sentences" > 
                <p style={{color:"Red",fontSize:"12px"}}>{Err}</p>
                    <QuestionsForm Answer1={Ans1} Answer2={Ans2} Answer3={Ans3} Questions={Qsn} Fnc={AnswerInputHandler} NextQuestions={AnswerUpdateHandler} speakelm={Qsn}></QuestionsForm>
                </div> 
            </ul>
            <ul className = "Sentencespeakerul" style={{ visibility: "hidden" }}>
                <div className = "SentenceSpeakerContainer">
                    <button onClick = {() => speak({ text: Qsn })} className = "SpeakerButtonbtn" > <i className = "fas fa-volume-up" > </i></button>
        </div></ul >
        </div>
    </div>
    );
}
export default InventoryTestPageComp;