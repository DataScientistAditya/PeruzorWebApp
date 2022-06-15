import React from "react";



const SignUpFormComp=(props)=>{
    return(
        <form className="Authform" onSubmit={props.GotoPretest}>
            <li><p style={{fontSize:"12px"}}>{props.cnt}</p></li>
            <li><input placeholder="Enter Your EMail" type="email" onChange={props.EmailInput}></input></li>
            <li><input placeholder="Enter Your Username" type="text" onChange={props.UsernameInput}></input></li>
            <li><input placeholder="Enter Your Password" type="password" onChange={props.PassInput}></input></li>
            <li><button type="submit">Sign Up</button></li>
        </form>
    );
}

export default SignUpFormComp;