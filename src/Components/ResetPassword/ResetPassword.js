import React,{useState} from "react";
import ResetFormComp from "../FormComps/Resetfor";
import { useNavigate } from "react-router-dom";


const ResetPasspage=()=>{

    const [email,SetEmail]= useState("");
    const [password,SetPassword] = useState("");
    const [RepPass,SetRepPass] = useState("");
    const [Content,SetContent] = useState("");

    let nav = useNavigate();


    const EmailInputHandler=(event)=>{
        SetEmail(event.target.value);
        console.log(email);
    };
    const PassInputHandler=(event)=>{
        SetPassword(event.target.value);
    };
    const RepPassInputHandler=(event)=>{
        SetRepPass(event.target.value);
    };
    async function LoginInputSubmitHandler(event){
        event.preventDefault();
        if (RepPass !== password) {
            return SetContent("Password not matched");
        };
        const LoginFormData={
            email: email,
            password: password
        }

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const ApiResponse =await fetch('https://iamadityachakraborty.pythonanywhere.com/Resetpaswword',{
            method:"POST",
            body:JSON.stringify(LoginFormData),
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (ApiResponse.ok) {
            const RespData = await ApiResponse.json().then(
                (Resp)=>{
                    SetContent("Password Changed,Please go to Login");
                }
            )
            
        }
        else{
            SetContent("Username is not valid");
        };
    }
    return(
        <div id="Login">
            <img id="Login_g" src="./Images/Login_g.png" srcSet="./Images/Login_g.png 1x, ./Images/Login_g@2x.png 2x"/>
            
            <div id="LoginGroup">
                    <div id="Sign_In">
                        <span>Reset Password</span>
                    </div>
                    <div className="AuthInputForm">
                        
                        <ul>
                            <ResetFormComp GotoPretest={LoginInputSubmitHandler} EmailInput={EmailInputHandler} PassInput={PassInputHandler} RepPassInput={RepPassInputHandler} err={Content}></ResetFormComp>
                        </ul>
                        <hr></hr>
                        <ul>
                            <div className="AccountPasswordForget"> 
                                    <h4>Go to SignIn?</h4>
                                    <button className="SignUp" onClick={()=>nav("/login")}>SignIn</button>
                            </div>
                        </ul>
                    </div>
            </div>
    </div>
    );
}
export default ResetPasspage;