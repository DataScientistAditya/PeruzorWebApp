import React,{ useState } from "react";
import "./Signin.css";
import SignIFormComp from "../FormComps/SiginForm";
import { useNavigate } from "react-router-dom";



const SigninPage=()=>{

    const [email,SetEmail]= useState("");
    const [password,SetPassword] = useState("");
    const [userName,SetUserName] = useState("");
    const [Content,SetContent] = useState("");
    let nav = useNavigate();

    const User_UUid = localStorage.getItem("Uid");
    const EmailInputHandler=(event)=>{
        SetEmail(event.target.value);
        console.log(email);
    };
    const PassInputHandler=(event)=>{
        SetPassword(event.target.value);
    };

    async function LoginInputSubmitHandler(event){
        event.preventDefault();
        const LoginFormData={
            email: email,
            password: password
        }

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const ApiResponse =await fetch('https://iamadityachakraborty.pythonanywhere.com/Login',{
            method:"POST",
            body:JSON.stringify(LoginFormData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (ApiResponse.ok) {
            const RespData = await ApiResponse.json().then(
                (Resp)=>{
                    
                    localStorage.setItem('Uid',Resp.Ud);
                    nav("/startTest/" + Resp.Ud );
                }
            )
            
        }
        else{
            SetContent("Username or Password is wrong or You have a Pending Verification")
        };
    };

    const RoutetoResetPass=()=>{
        return nav("/resetpass");
    }
    return(
        <div id="Login">
            <img id="Login_g" src="./Images/Login_g.png" srcSet="./Images/Login_g.png 1x, ./Images/Login_g@2x.png 2x"/>
            
            <div id="LoginGroup">
                    <div id="Sign_In">
                        <span>Sign In</span>
                    </div>
                    <div className="AuthInputForm">
                        
                        <ul>
                            <SignIFormComp GotoPretest={LoginInputSubmitHandler} EmailInput={EmailInputHandler} PassInput={PassInputHandler} cnt={Content} Respass={RoutetoResetPass}></SignIFormComp>
                        </ul>
                        <hr></hr>
                        <ul>
                            <div className="AccountPasswordForget"> 
                                    <h4>Create Account?</h4>
                                    <button className="SignUp" onClick={()=>nav("/create-account")}>SignUp</button>
                            </div>
                        </ul>
                    </div>
            </div>
    </div>
    );
}
export default SigninPage;