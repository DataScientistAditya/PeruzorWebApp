import React,{useState} from "react";
import "./SignUp.css";
import SignUpFormComp from "../FormComps/SignUpForm";
import { useNavigate } from "react-router-dom";


const SignUpPage=()=>{

    const [email,SetEmail]= useState("");
    const [password,SetPassword] = useState("");
    const [userName,SetUserName] = useState("");
    const [Content, SetContent] = useState("");
    const [isDisabled,SetDisabled] = useState("");

    let nav = useNavigate();
    const EmailSubmitHandler =(event)=>{
        SetEmail(event.target.value);
    };
    const UernameInputHandler =(event)=>{
        SetUserName(event.target.value);
    };
    const PasswordInputHandler =(event)=>{
        SetPassword(event.target.value);
    };
    async function CreateAccountSubmitHandler(event){
        event.preventDefault();
        const CreateAccountData={
            email:email,
            username:userName,
            password:password,
        };

        console.log(CreateAccountData);
        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const ApiCreateAccountResp =await fetch('https://iamadityachakraborty.pythonanywhere.com/Register',{
            method:"POST",
            body:JSON.stringify(CreateAccountData),
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (ApiCreateAccountResp.ok) {
            const ResopnseCreateAccont = await ApiCreateAccountResp.json().then(
                (Respns)=>{
                    localStorage.setItem('Username',Respns.Username);
                    SetContent(Respns.data);
                    SetDisabled("disabled");
                    // setTimeout(()=>{nav("/login")},1000);

                }
            )
        }else{
            const ResopnseCreateAccont = await ApiCreateAccountResp.json().then(
                (Respns)=>{
                    SetContent(Respns.data); 
                    SetDisabled("disabled");
                }
            )
        };
    };
    return(
        <div id="Reg">
        <img id="Login_g" src="./Images/Login_g.png" srcSet="./Images/Login_g.png 1x, ./Images/Login_g@2x.png 2x"/>
        
        <div id="RegGroup">
                <div id="Sign_In">
                    <span>Sign Up</span>
                </div>
                <div className="AuthInputForm">
                    
                    <ul>
                        <SignUpFormComp GotoPretest={CreateAccountSubmitHandler} EmailInput = {EmailSubmitHandler} UsernameInput={UernameInputHandler} PassInput={PasswordInputHandler}cnt={Content}></SignUpFormComp>
                    </ul>
                    <hr></hr>
                    <ul>
                        <div className="AccountPasswordForget"> 
                                <h4>Have an Account?</h4>
                                <button className="SignUp" disabled={isDisabled} onClick={()=>nav("/login")}>SigIn</button>
                        </div>
                    </ul>
                </div>
        </div>
</div>
    );
}

export default SignUpPage;