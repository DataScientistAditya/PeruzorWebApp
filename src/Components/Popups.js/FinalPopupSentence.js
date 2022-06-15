import React from "react";


const FinalResultSentencePopUpComp =(props)=>{
    return(
        <div className="Results">
            <p>Your {props.TestTyp} Test is Over</p>
            <p>{props.nextType}</p>
            <p>{props.readingmiss}{props.readingmisslen}</p>
            <p>Your Score is {props.ResultFinal}/{props.total}</p>
            <button className="NextTestButton" onClick={props.NextTest}>Proceed</button>
        </div>
    );
}

export default FinalResultSentencePopUpComp;