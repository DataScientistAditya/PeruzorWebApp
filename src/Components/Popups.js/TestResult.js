import React from "react";
import "./TestResults.css";


const TestResultComp=(props)=>{
    return(
        <div className="ResultContainer" style={props.Visibility} >
            <a style={{fontSize:"10px",float:"right",cursor:"pointer"}} onClick={props.ClosePopup}>X</a>
            <div className="Result">
                <hr></hr>
                <ul>
                    <li><h4>Letters Test</h4></li>
                    <hr></hr>
                    <li><h4>Sentence Test</h4></li>
                    <hr></hr>
                    <li><h4>Words Test</h4></li>
                    <hr></hr>
                    <li><h4>Story Test</h4></li>
                    <hr></hr>
                    <li><h4>Missing Words</h4></li>
                </ul>
                <hr></hr>
                <ul>
                    <li><h2>{props.Letters}</h2></li>
                    <hr></hr>
                    <li><h2>{props.Sentences}</h2></li>
                    <hr></hr>
                    <li><h2>{props.Words}</h2></li>
                    <hr></hr>
                    <li><h2>{props.Story}</h2></li>
                    <hr></hr>
                    <li><h2>{props.Missing}</h2></li>
                </ul>
                <hr></hr>
            </div>

        </div>
    );
}

export default TestResultComp;