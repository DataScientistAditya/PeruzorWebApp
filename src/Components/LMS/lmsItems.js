import React ,{useState} from "react";



const LmsItems=(props)=>{
    return(
        <div className="HeaderItems" style={props.isItemShow}>
            <li style={props.margin}><div className="ItemShower">{props.Item1}</div></li>
            <li style={props.margin}><div className="ItemShower">{props.Item2}</div></li>
            <li style={props.margin}><div className="ItemShower">{props.Item3}</div></li>
            <li style={props.margin}><div className="ItemShower">{props.Item4}</div></li>
        </div>
    );
}

export default LmsItems;