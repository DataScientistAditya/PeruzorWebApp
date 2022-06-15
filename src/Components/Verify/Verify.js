import React,{useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import "./Verify.css";
import { useNavigate } from "react-router-dom";

const Verify=()=>{
    const [Messege,SetMessege] = useState('');
    const [LinkEnable,SetEnable] = useState({dispaly:"none"});
    const {username} = useParams();
    let nav = useNavigate();

    async function VerifySubmitHandler(){
        const LoginFormData={
            Uid: username
        }

        //https://iamadityachakraborty.pythonanywhere.com/ <---Replace this before build
        const ApiResponse =await fetch('https://iamadityachakraborty.pythonanywhere.com/Verify',{
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
                    SetMessege("You are successfully Verified");
                    SetEnable({dispaly:"block"});
                }
            )
            
        }
        else{
            SetMessege("You are not verified");
            SetEnable({dispaly:"none"});
        };
    };

    useEffect(()=>{
        VerifySubmitHandler();
    },[]);

    let Contetent = "";
    useEffect(()=>{
        Contetent = Messege;
    },[Messege])
    
    const RouteToLogin=()=>{
        nav("/Login/" );
    }
    return(
        <div id="Login">
            <div className="Messege">
                <p>{Messege}</p><a style={LinkEnable} onClick={RouteToLogin}>Follow this Link</a>
            </div>
        </div>
    )
}


export default Verify;