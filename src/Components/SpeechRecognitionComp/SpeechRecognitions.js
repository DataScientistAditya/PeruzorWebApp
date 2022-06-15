import { useRef, useState} from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "./SpeechRecognitions.css";

function SpeechRecognitionsComp(props) {
  const { transcript, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);
  const microphoneRef = useRef(null);


  let data = "";
  if (transcript!=""){
    data=transcript.toString();
  };

 
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return (
      <div className="mircophone-container">
        Browser is not Support Speech Recognition.
      </div>
    );
  }
  const handleListing = () => {
    setIsListening(true);
    microphoneRef.current.classList.add("listening");
    SpeechRecognition.startListening({
      continuous: true,
    });
  };
  const stopHandle = () => {
    setIsListening(false);
    microphoneRef.current.classList.remove("listening");
    SpeechRecognition.stopListening();
  };
  const handleReset = () => {
    stopHandle();
    resetTranscript();
  };

  return (
    <div className="microphone-wrapper">
      <div className="mircophone-container">
        <div
          className="microphone-icon-container"
          ref={microphoneRef}
          onClick={handleListing}
        >
          <i className="fas fa-microphone"></i>
        </div>
        <div className="microphone-status">
          {isListening ? "Listening........." : "Click to start Listening"}
        </div>
        {isListening && (
          <button className="microphone-stop btn" onClick={stopHandle}>
            Stop
          </button>
        )}
      </div>
      <div className="PopUpStoryShow" style={props.Storyshowonmice}>
          <h5 style={props.size}>{props.StoryShow}</h5>
      </div>
      {transcript && (
        <div className="microphone-result-container">
          <div className="microphone-result-text" style={props.ShowingTrans}>{transcript}</div>
          <div className="Buttons">
          <button className="microphone-reset btn" onClick={handleReset} disabled={props.Isdisabled} style={props.ResetVisibility}>
            Reset
          </button>
          <button className="Submit btn" onClick={()=>{props.SubmitText(data);resetTranscript()}}>
            Submit
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default SpeechRecognitionsComp;