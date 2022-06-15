import React,{useRef,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SpeechRecognitionsComp from "../SpeechRecognitionComp/SpeechRecognitions";
import { useSpeechSynthesis } from "react-speech-kit";
import FinalResultSentencePopUpComp from "../Popups.js/FinalPopupSentence";
//import ResultPopUpComp from "../Popups.js/ResultPopup";
import PopUpcomp from "../Popups.js/Popups";
import PopupStory from "../Popups.js/Popupstories";
import QuestionsForm from "../FormComps/QuestionsForm";



const PostStoriesComp=()=>{
    const [WordShow, SetWordShow] = useState("");
    const [WordsSpelled, SetWordsSpeeled] = useState("");
    const [IsMicrophonPopUp, SetMicrophonePopUp] = useState(false);
    const [isInputConfirmed, SetInputConfirmed] = useState(false);
    const [isPopUpDisplay, SetDisplayPopUp] = useState({ visibility: "hidden" });
    const [Content,SetContent] = useState("");
    const [isStartButton, SetStartButton] = useState({ visibility: "visible" });
    const [FinalResultPopupDisplay,SetFinalResultPopupDisplay] = useState({visibility:"hidden"});
    const [ResultPopupDisplay, SetResultPopupDisplay] = useState({ visibility: "hidden" });
    const [isSpeech, SetDisplaySpeech] = useState({ visibility: "hidden" });
    const [TestType,SetTestType] = useState("");
    const [Unmateched,SetUnmatchedList] = useState([]);
    const [QuestionsList, SetQuestionsList] = useState([]);
    const [ShowContent,SetShowContent] = useState("");
    const [ShowStory,SetShowStory] = useState(false);
    const [ErrorLog,SetErrorLog] = useState("");
    //const [QuestionsContent,SetQuestionsContent] = useState("");
    const [Heading,SetHeadings]=useState("");
    const [MicrophoneVisibility,SetMicrophoneVisibility] = useState({visibility:"visible"});
    const [Answer,SetAnswer] = useState("");
    const [UpdateAnserList,SetUpdateAnswerList] = useState([]);
    const [visibleilityofInputs,SetvisibleilityofInputs] = useState({visibility:"hidden"})
    const [Question,SetQsn] = useState("How many States in USA?");
    const [Ans1,SetAns1] = useState("50");
    const [Ans2,SetAns2] = useState("21");
    const [Ans3,SetAns3] = useState("56");
    const [Ans4,SetAns4] = useState("48");
    const [ResultofReading,SetResultofReading] = useState("");
    const [IsQuestions,SetisQuestions] = useState({visibility:"visible"})
    
    const {username} =useParams();
    let nav = useNavigate();
    const countRef = useRef(0);
    const { speak } = useSpeechSynthesis();
    const IndexCounter = useRef(0);

    //Setting up stories // http://127.0.0.1:8000/<==== testing purpose <=== https://iamadityachakraborty.pythonanywhere.com/ <==== development
    async function GetUserSentenceTestScore(){
        const UserData={
            Uid:username,
        };

        const SentenceApiResp = await fetch('https://iamadityachakraborty.pythonanywhere.com/PostTestGetWordsTestScore',{
            method:"POST",
            body:JSON.stringify(UserData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (SentenceApiResp.ok) {
            const ApiResponse = await SentenceApiResp.json().then(
                (Resp)=>{
                    SetWordShow(Resp.DataList);
                    SetTestType(Resp.type)
                    SetisQuestions({visibility:"hidden"})
                }
            )
        }
    };

    //Sending data to  Comapare stories http://127.0.0.1:8000/<==== testing purpose <=== https://iamadityachakraborty.pythonanywhere.com/ <==== development
    async function CompareStories(Value){
        
        const Comparelist={
            type:TestType,
            story:Value,
        };
        const SentenceApiResp = await fetch('https://iamadityachakraborty.pythonanywhere.com/PostCompareStories',{
            method:"POST",
            body:JSON.stringify(Comparelist),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (SentenceApiResp.ok) {
            const ApiResponse = await SentenceApiResp.json().then(
                (Resp)=>{
                    SetUnmatchedList(Resp.Unmathched_List.Unmatched);
                    SetQuestionsList(Resp.Questions_List);
                    SetShowContent("Prepare for the Questions");
                    SetHeadings("Answer Thease Questions")
                    return SetShowStory(true);
                }
            )
        }else{
            SetErrorLog("Somthing went wrong,Try again later");
        };
        

    }
    const UpdateAnswers=(Ans)=>{
        SetUpdateAnswerList(arr=>[...arr,Ans]);
    }

    const AnswerInputHandler=(event)=>{
        SetAnswer(event.target.value);
    }
    const NextQuestion=()=>{
        if (IndexCounter.current <= QuestionsList.length) {
            if (Answer !=="Select") {
                if (Ans1=== Answer) {
                    countRef.current++;
                }
                UpdateAnswers(Answer);
                SetResultPopupDisplay({visibility:"visible"});
                IndexCounter.current++;
            }
            else{
                SetErrorLog("Please Select a Value");
            };  
        };
    };
    const NextClicked = () => {
        console.log(ShowStory);
        if (!ShowStory) {
            GetUserSentenceTestScore();
            SetResultPopupDisplay({ visibility: "hidden" });
        };
        SetAnswer("Select");
        if (ShowStory) {
            if (QuestionsList.length == UpdateAnserList.length) {
                SetFinalResultPopupDisplay({visibility:"visible"});
            };
            SetvisibleilityofInputs({visibility:"visible"});
            SetWordShow("");
            SetMicrophoneVisibility({visibility:"hidden"});
            SetResultPopupDisplay({ visibility: "hidden" });
            console.log("Answer List is",UpdateAnserList);
            SetQsn(QuestionsList[IndexCounter.current].Questions) 
            SetAns1(QuestionsList[IndexCounter.current].Answer);
            SetAns2(QuestionsList[IndexCounter.current].Answer2);
            SetAns3(QuestionsList[IndexCounter.current].Answer3);
            SetAns4(QuestionsList[IndexCounter.current].Answer4)
            //console.log(QuestionsList[IndexCounter.current].Questions);
        };
        
    };
    let PopUpContent = <p></p>;
    function PassAudioText(data) {
        SetDisplayPopUp({ visibility: "visible" });
        if (isInputConfirmed) {
            CompareStories(data);
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
    let ShowingContent = <p></p>;
    const AssigningLetters = () => {
        SetWordShow("Hello how are You");
        SetStartButton({ visibility: "hidden" });
        //letters.push(Showingletter); 
        SetHeadings("Read story as appear below using microphone");
        SetShowContent("You have to read the story on microphone, each missing words will be counted");

    };

    const RecordingPopup = () => {
        SetMicrophonePopUp(true);
        return SetDisplaySpeech({ visibility: "visible" });
    };
    let RecordingPopUps = <p > </p>;
    if (IsMicrophonPopUp) {
        RecordingPopUps = <SpeechRecognitionsComp SubmitText = { PassAudioText } StoryShow={WordShow} Storyshowonmice={isSpeech} size={{fontSize:"12px"}} Isdisabled="disabled" ShowingTrans={{visibility:"hidden"}}> </SpeechRecognitionsComp>;
    };


    // Sending scores of stories test // http://127.0.0.1:8000/<==== testing purpose <=== https://iamadityachakraborty.pythonanywhere.com/ <==== development
    async function WordsPretestScoreSubmit(){
        const WordsTest={
            Uid:username,
            Score:countRef.current,
            Level:TestType,
            Missing:Unmateched.length
        };

        const SendData = await fetch('https://iamadityachakraborty.pythonanywhere.com/PostSetStoryTestScore',{
            method:"POST",
            body:JSON.stringify(WordsTest),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (SendData.ok) {
            const RespSendData = await SendData.json().then(
                (Resp)=>{
                    nav("/TestOverpost/"+ username);
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
        let Text = "You will be showned a story, You have to read it on microphone, each missing words will be counted and few questions will be asked from story, first one will be for practice where score will not be counted, Please click on the button to start the test"
        Say(Text);
    },[]);

    return(
        <div className = "SentencesShow" >
        <div className="FinalPopUpResult" style={FinalResultPopupDisplay}>
            <FinalResultSentencePopUpComp ResultFinal={countRef.current} NextTest={NextTest}  TestTyp="Post Test" nextType="Proceed to Finish"></FinalResultSentencePopUpComp>
        </div>
        <div className = "SentencePopUpResult" style = { ResultPopupDisplay } >
            <PopupStory Nextletter={NextClicked}  ShowingContent={ShowContent}> </PopupStory> 
        </div>
        <div className = "SentencesStartScreen" style = {isStartButton } >
        <div className="SentenceStartscrrencontains" style={{position:"relative",width:"100%",height:"60%",marginTop:"20%"}}>
            <p style = {{ color: "white", fontSize: "12px" }} > Note: You will be showned a story, </p> 
            <p style = {{ color: "white", fontSize: "12px" }} > Read the Story carefully. </p>
            <p> Please click on the button to start the test </p>
            <div className = "SentenceInstructions">
                    <button onClick = {() => speak({ text: "You will be showned a story, You have to read it on microphone, each minning words will be counted and few questions will be asked from story, first one will be for practice where score will not be counted, Please click on the button to start the test" })} className = "SpeakerInstructions" > <i className = "fas fa-volume-up" > </i></button>
            </div>
            <button onClick = { AssigningLetters } > Start </button> 
         </div> 
         </div>
         <div className = "SentencesSpeechcontainer" style = { isSpeech } >
            <PopUpcomp YesClicked = { InputConfirmed } NoClicked = { InputCanceled } Display = { isPopUpDisplay } > </PopUpcomp>
            { RecordingPopUps } 
        </div> 
        
        <p> {Heading} </p> 
        <div className = "Sentencescontainer" >
            <ul className = "SentencessUl" >
                <div className = "Sentences" > 
                    <p style={{fontSize:"12px",color:"Red"}}>{ErrorLog}</p>
                    <p> { WordShow } </p>
                    <QuestionsForm Fnc={AnswerInputHandler} NextQuestions={NextQuestion} Answer1={Ans1} Answer2={Ans2} Answer3={Ans3} Answer4={Ans4}  Questions ={Question} Visof={visibleilityofInputs} speakelm={Question}></QuestionsForm>
                </div> 
            </ul>
            <ul className = "Sentencespeakerul" style={IsQuestions}>
                <div className = "SentenceSpeakerContainer">
                    <button onClick = {() => speak({ text: WordShow})} className = "SpeakerButtonbtn"  style={MicrophoneVisibility}> <i className = "fas fa-volume-up" > </i></button>
        </div></ul >
        </div>
        <div className = "SentenceMicroPhoneContainer" >
            <button className = "SentenceMicrophone" onClick = { RecordingPopup } >  <i className = "fas fa-microphone"  style={MicrophoneVisibility}> </i></button >
        </div>
    </div>
    );
}

export default PostStoriesComp;