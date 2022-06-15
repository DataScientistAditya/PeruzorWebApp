import React from "react";


const IntelligenceResultSentencePopUpComp =(props)=>{
    return(
        <div className="Results">
            <p>Your Test is Over</p>
            <p>By the Quiz We get that you have {props.ResultFinal}</p>
            <button className="NextTestButton" onClick={props.NextTest}>Proceed</button>
        </div>
    );
}

export default IntelligenceResultSentencePopUpComp;