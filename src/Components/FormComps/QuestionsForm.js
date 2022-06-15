import React from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import "./QuestionsForm.css";


const QuestionsForm=(props)=>{
    const { speak } = useSpeechSynthesis();
    return(
        <div className="QuestionSform" style={props.Visof} >
            <h1>{props.Questions}</h1><button onClick = {() => speak({ text: props.speakelm })} className = "Spkrbtn" style={{background:"transparent",color:"white",marginLeft:"80%"}}> <i className = "fas fa-volume-up" > </i></button>
            <select className="OptionsSection" onChange={props.Fnc} defaultValue={{ label: "Select", value:0 }}>
                <option  value="Select" >Select</option>
                <option  value={props.Answer1} >{props.Answer1}</option>
                <option  value={props.Answer2} >{props.Answer2}</option>
                <option  value={props.Answer3} >{props.Answer3}</option>
                <option  value={props.Answer4} >{props.Answer4}</option>
            </select>
            <button type="submit" className="AnswerButton" onClick={props.NextQuestions}>Answer</button>
        </div>
    );
}

export default QuestionsForm;