import React from "react";



const ResetFormComp=(props)=>{
    return(
        <form className="Authform" onSubmit={props.GotoPretest}>
            <li><p style={{"color":"#FFA616","fontSize":"12px",textAlign:"center"}}>{props.err}</p></li>
            <li><input placeholder="Enter Your EMail" type="email" onChange={props.EmailInput}></input></li>
            <li><input placeholder="Enter Your Password" type="password" onChange={props.PassInput}></input></li>
            <li><input placeholder="Repeat Your Password" type="password" onChange={props.RepPassInput}></input></li>
            <li><button type="submit">Submit</button></li>
        </form>
    );
}

export default ResetFormComp;