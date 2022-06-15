import React from "react";


const FinalResultPopUpComp =(props)=>{
    return(
        <div className="Results">
            <p>Your Test is Over</p>
            <button className="NextTestButton" onClick={props.NextTest}>Next Test</button>
        </div>
    );
}

export default FinalResultPopUpComp;