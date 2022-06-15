import react,{useEffect,useState} from "react";
import "./Landing.css";
import { useNavigate } from "react-router-dom";
//import Speech from 'speak-tts';


const LandingPage=()=>{
    
    //Using for Navigation
    let nav=useNavigate();
    
    const speech = new SpeechSynthesisUtterance();
    const speak = () => {
        
        speech.text = "Hello Friend, Welcome to Peruzor";
        speech.lang = "en-US" ;
        //this.setState({ isSpeeking: true });
        window.speechSynthesis.speak(speech);
      };
    useEffect(()=>{
        window.speechSynthesis.cancel();
        speak();
        
    //     speech.init({
    //         'volume': 1,
    //          'lang': 'en-US',
    //          'rate': 1,
    //          'pitch': 1,
    //          'voice':'Google UK English Male',
    //          'splitSentences': true,
    //          'listeners': {
    //              'onvoiceschanged': (voices) => {
    //                  console.log("Event voiceschanged", voices)
    //              }
    //          }
    //  });
    //     speech.speak({
    //         text: 'Hello Friend, Welcome to Peruzor',
    //     }).then(() => {
    //         console.log("Success !")
    //     }).catch(e => {
    //         console.error("An error occurred :", e)
    //     });
    //     console.log("Speak");
    },[]);
    return(
        <div id="LandingPageAISpeech">
            <img id="Background" src=".\Images\Background.png" srcSet=".\Images\Background.png 1x, .\Images\Background@2x.png 2x"/>
            <img id="BackGround_Mobile" src=".\Images\LandingMobile.jpg"  />
            <img id="BackGround_Small_Mobile" src=".\Images\414Screen.png"  />
            <img id="BackGround_bIG_Mobile" src=".\Images\BigSCREEN.png"  />
            <div className="Welcome">
                <div id="Welcome_to_Peruzor">
                    <span>Welcome to Peruzor</span>
                </div>
                <div id="Where_Transformation_meets_Rea">
                    <span>Where Transformation meets Reading</span>
                </div>
                <button className="GetStartedButton" onClick={()=>nav("/login")}>Get Started</button>
            </div>
        </div>
    );
}

export default LandingPage;