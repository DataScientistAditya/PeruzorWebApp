import React ,{useState} from "react";



const Lmslist=(props)=>{
    return(
        <div className="HeaderItems" style={props.isStudentShow}>
            <li style={props.margin}>{props.Item1}</li>
            <li style={props.margin}>{props.Item2}</li>
            <li style={props.margin}>{props.Item3}</li>
            <li style={props.margin}>{props.Item4}</li>
        </div>
    );
}

export default Lmslist;