import React from "react";


const InventoryPopUpComp =(props)=>{
    return(
        <div className="Results">
            <p>Click Next to Proceed</p>
            <button className="NextButton" onClick={props.Nextletter} disabled={props.DisableCond}>Next</button>
        </div>
    );
}

export default InventoryPopUpComp;