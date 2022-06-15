import React from "react";


const PopupStory=(props)=>{
    return(
        <div className="Results">
            <p>Click Next to Proceed</p>
            <p>{props.ShowingContent}</p>
            <button className="NextButton" onClick={props.Nextletter}>Begin</button>
        </div>
    );
}

export default PopupStory;