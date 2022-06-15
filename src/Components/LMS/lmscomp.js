import React from "react";
import "./lmscomp.css";
import { useState } from "react";
import Lmslist from "./lmslists";
import LmsItems from "./lmsItems";
import LmsButton from "./lmsbutton";
import { format } from "react-string-format";
import TestResultComp from "../Popups.js/TestResult";



const LmsComp=()=>{
    const [ishow,SetShow] = useState({ display: "none" });
    const [isPosthow,SetPostShow] = useState({ display: "none" });
    const [isinventoryhow,Setinventoryhow] = useState({ display: "none" });
    const [isStudentShow,SetStudentShow] = useState({display: "none"})
    const [backgroundcolor,SetBackgroundColor] = useState({backgroundColor: "rgb(234, 242, 248, 0.02)"});
    //const [margin,SetMargin] = useState({width: 0,marginLeft:0});
    const [stndshow, Setstnd] = useState(false);
    const [posttest,SetPostTest] = useState("");
    const [pretest,SetPreTest] = useState("");
    const [inventory,SetInventoryTest] = useState("");
    const [interestTest,SetInterestTest] = useState("");
    const [closevisible,SetCloseVisible] = useState({display:"none"})
    const [closebar, SetCloseWidth] = useState({maxWidth:0,display:"none"});
    const [showresult,SetShowResult] = useState({display:"none"});
    const [closeresvisible,SetCloseResVisible] = useState({display:"block"});
    
    const [isPreLettersDisplay,SetPreLettersDisplay] = useState(false);
    const [isPreSentencesDisplay,SetPreSentencestDisplay] = useState(false);
    const [isPreWordsDisplay,SetPreWordsDisplay] = useState(false);
    const [isPreStoriesDisplay,SetPreStoriesDisplay] = useState(false);
    const [isPostLettersDisplay,SetPostLettersDisplay] = useState(false);
    const [isPostSentencesDisplay,SetPostSentencesDisplay] = useState(false);
    const [isPostWordsDisplay,SetPostWordsDisplay] = useState(false);
    const [isPostStoriesDisplay,SetPostStoriesDisplay] = useState(false);
    const [PreLettersShow,SetPreLettersShow] = useState({display:"none"});
    const [PreSentenceShow,SetPreSentencesShow] = useState({display:"none"});
    const [PreWordssShow,SetPreWordsShow] = useState({display:"none"});
    const [PostLettersShow,SetPostLettersShow] = useState({display:"none"});
    const [PostSentenceShow,SetPostSentencesShow] = useState({display:"none"});
    const [PostStoriesShow,SetPostStoriesShow] = useState({display:"none"});
    const [PreStoriessShow,SetPreStoriesShow] = useState({display:"none"});
    const [PostWordsShow,SetPostWordsShow] = useState({display:"none"});
    const [TestType,SetTestType] = useState("");
    const [UserId,SetUserId] = useState("");
    
    const [AllStudentData,SetAllStudentData] = useState([]);
    const [PreTestLettersData,SetPreLettersData] = useState([]);
    const [PreTestSentencesData,SetPreSentencesData] = useState([]);
    const [PreTestWordsData,SetPreWordsData] = useState([]);
    const [PreTestStoriessData,SetPreStoriesData] = useState([]);
    const [PretestRes,SetPreTestRes] = useState([]);

    let Lmslst = <Lmslist isStudentShow = {isStudentShow} ></Lmslist>;
    let Lmsitm = <p></p>;
    let LmsHeader =<p></p>;
    const openSidebars = require("./open.jpg");
    const closeSidebars = require("./close.png");
    let ResultContent = <p></p>;

    const OpenSidebar=()=>{
        SetCloseWidth({maxWidth:"200px",display:"block"});
        SetCloseVisible({display:"block"});

    };

    const CloseSidebar=()=>{
        SetCloseWidth({maxWidth:0,display:"none"});
        SetCloseVisible({display:"none"});
    }


    const ShowPrelist=()=>{
        if (ishow.display ==="none" ) {
            SetShow({ display: "block" });
        }
        else{
            SetShow({ display: "none" });
        }
        
    }

    const ShowPostlist=()=>{
        if (isPosthow.display === "none") {
            SetPostShow({ display: "block" });
        }
        else{
            SetPostShow({ display: "none" });
        }
    }

    const ShowInventoryList=()=>{
        if (isinventoryhow.display ==="none") {
            Setinventoryhow({ display: "block" });
        }
        else{
            Setinventoryhow({ display: "none" })
        }
    }


    async function ShowStudents(){
        if (isStudentShow.display==="none") {
            const response = await fetch('https://iamadityachakraborty.pythonanywhere.com/GetAllStudentData');
            const data = await response.json();
            if (AllStudentData.length===0) {
                SetAllStudentData(data);
            }
            
            //SetMargin({width:"25%",marginLeft:"40px"});
            Setstnd(true);
            SetPreLettersDisplay(false);
            SetPreSentencestDisplay(false);
            SetPreWordsDisplay(false);
            SetPreStoriesDisplay(false);
            SetPostLettersDisplay(false);
            SetPostSentencesDisplay(false);
            SetPostWordsDisplay(false);
            SetPostStoriesDisplay(false);
            SetPostLettersShow({display:"none"});
            SetPostSentencesShow({display:"none"});
            SetPostStoriesShow({display:"none"});
            SetPostWordsShow({display:"none"});
            SetPreSentencesShow({display:"none"});
            SetPreStoriesShow({display:"none"});
            SetPreWordsShow({display:"none"});
            SetPreLettersShow({display:"none"});
            SetStudentShow({display: "block"});
            SetBackgroundColor({backgroundColor: "#898989"})
        }
        else{
            SetStudentShow({display: "none"});
            Setstnd(false);
            SetBackgroundColor({backgroundColor: "rgb(234, 242, 248, 0.02)"})
        }
    }


    const PreTestValue=(e)=>{
        SetPreTest(e.target.value);
        console.log(pretest);
        SetShowResult({display:"block"});
        let Splits = pretest.split("@",2) 
        SetTestType(Splits[1]);
        SetUserId(Splits[0]);
        // if (Splits[1]==="pretest") {
        //     

        // }else if (Splits[1]==="posttest") {
        //     console.log(Splits[0])
        //     const ResultList={
        //         Uid:Splits[0],
        //     };
        //     const SentenceApiResp = await fetch('https://iamadityachakraborty.pythonanywhere.com/PosttestResults',{
        //         method:"POST",
        //         body:JSON.stringify(ResultList),
        //         headers: {
        //             'Content-Type': 'application/json',
        //         }
        //     });
        //     if (SentenceApiResp.ok) {
        //             const ApiResponse = await SentenceApiResp.json();
        //             SetPreTestRes(ApiResponse);
        //             console.log(PretestRes);
        //         }
        // }
    };


    async function GetPreRes(){
        console.log(Splits[0])
            const ResultList={
                Uid:Splits[0],
            };
            const SentenceApiResp = await fetch('https://iamadityachakraborty.pythonanywhere.com/PretestResults',{
                method:"POST",
                body:JSON.stringify(ResultList),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (SentenceApiResp.ok) {
                    const ApiResponse = await SentenceApiResp.json();
                    SetPreTestRes(ApiResponse);
                    console.log(PretestRes);
            }
    }
    const PostTestValue=(e)=>{
        SetPostTest(e.target.value);
        SetShowResult({display:"block"});
    };
    const InventoryTest=(e)=>{
        SetInventoryTest(e.target.value);
        SetShowResult({display:"block"});
    };
    const InterestTest=(e)=>{
        SetInterestTest(e.target.value);
        SetShowResult({display:"block"});
    };
    const CloseResSidebar=()=>{
        SetShowResult({display:"none"});
    }


    async function GetAllStudentsLetterScore(){
        const response = await fetch('https://iamadityachakraborty.pythonanywhere.com/GetPretestLettersData');
        const data = await response.json();
        SetPreLettersData([]);
        if (data !== null) {
            SetPreLettersData(data);
            console.log(PreTestLettersData);
            SetPreLettersDisplay(true);
            SetPreSentencestDisplay(false);
            SetPreWordsDisplay(false);
            SetPreStoriesDisplay(false);
            SetPostLettersDisplay(false);
            SetPostSentencesDisplay(false);
            SetPostWordsDisplay(false);
            SetPostStoriesDisplay(false);
            Setstnd(false);
            //SetMargin({width:"25%",marginLeft:"40px"});
            SetPostLettersShow({display:"none"});
            SetPostSentencesShow({display:"none"});
            SetPostStoriesShow({display:"none"});
            SetPostWordsShow({display:"none"});
            SetPreSentencesShow({display:"none"});
            SetPreStoriesShow({display:"none"});
            SetPreWordsShow({display:"none"});
            SetPreLettersShow({display:"block"});
            SetStudentShow({display:"none"});
            SetBackgroundColor({backgroundColor: "rgb(234, 242, 248, 0.02)"});
        };
    };

   
    async function GetAllStudentsSebtenceScore(){
        const response = await fetch('https://iamadityachakraborty.pythonanywhere.com/GetPretestSentencesData');
        const data = await response.json();
        SetPreSentencesData([]);
        if (data !== null) {
            SetPreSentencesData(data);
            console.log(PreTestSentencesData);
            SetPreLettersDisplay(false);
            SetPreSentencestDisplay(true);
            SetPreWordsDisplay(false);
            SetPreStoriesDisplay(false);
            SetPostLettersDisplay(false);
            SetPostSentencesDisplay(false);
            SetPostWordsDisplay(false);
            SetPostStoriesDisplay(false);
            Setstnd(false);
            //SetMargin({width:"25%",marginLeft:"40px"});
            SetPostLettersShow({display:"none"});
            SetPostSentencesShow({display:"none"});
            SetPostStoriesShow({display:"none"});
            SetPostWordsShow({display:"none"});
            SetPreLettersShow({display:"none"});
            SetPreStoriesShow({display:"none"});
            SetPreWordsShow({display:"none"});
            SetPreSentencesShow({display:"block"});
            SetStudentShow({display:"none"});
            SetBackgroundColor({backgroundColor: "rgb(234, 242, 248, 0.02)"})

        };
    };


    async function GetAllStudentsWordScore(){
        const response = await fetch('https://iamadityachakraborty.pythonanywhere.com/GetPretestWordsData');
        const data = await response.json();
        SetPreWordsData([]);
        if (data !== null) {
            SetPreWordsData(data);
            console.log(PreTestSentencesData);
            SetPreLettersDisplay(false);
            SetPreSentencestDisplay(false);
            SetPreWordsDisplay(true);
            SetPreStoriesDisplay(false);
            SetPostLettersDisplay(false);
            SetPostSentencesDisplay(false);
            SetPostWordsDisplay(false);
            SetPostStoriesDisplay(false);
            Setstnd(false);
            //SetMargin({width:"25%",marginLeft:"40px"});
            SetPostLettersShow({display:"none"});
            SetPostSentencesShow({display:"none"});
            SetPostStoriesShow({display:"none"});
            SetPostWordsShow({display:"none"});
            SetPreLettersShow({display:"none"});
            SetPreStoriesShow({display:"none"});
            SetPreWordsShow({display:"block"});
            SetPreSentencesShow({display:"none"});
            SetStudentShow({display:"none"});
            SetBackgroundColor({backgroundColor: "rgb(234, 242, 248, 0.02)"})

        };
    };

    
    async function GetAllStudentStoriesScore(){
        const response = await fetch('https://iamadityachakraborty.pythonanywhere.com/GetPretestStoryData');
        const data = await response.json();
        SetPreStoriesData([]);
        if (data !== null) {
            SetPreStoriesData(data);
            console.log(PreTestSentencesData);
            SetPreLettersDisplay(false);
            SetPreSentencestDisplay(false);
            SetPreWordsDisplay(false);
            SetPreStoriesDisplay(true);
            SetPostLettersDisplay(false);
            SetPostSentencesDisplay(false);
            SetPostWordsDisplay(false);
            SetPostStoriesDisplay(false);
            Setstnd(false);
            //SetMargin({width:"25%",marginLeft:"40px"});
            SetPostLettersShow({display:"none"});
            SetPostSentencesShow({display:"none"});
            SetPostStoriesShow({display:"none"});
            SetPostWordsShow({display:"none"});
            SetPreLettersShow({display:"none"});
            SetPreStoriesShow({display:"block"});
            SetPreWordsShow({display:"none"});
            SetPreSentencesShow({display:"none"});
            SetStudentShow({display:"none"});
            SetBackgroundColor({backgroundColor: "rgb(234, 242, 248, 0.02)"})

        };
    };





   
    if (isPreLettersDisplay){
        Lmslst = <Lmslist isStudentShow = {PreLettersShow}  Item1 = "Pre Test Letters" ></Lmslist>;
        LmsHeader = <div className="HeaderToken"><LmsItems isItemShow={PreLettersShow}
                    
                            Item1 = "Email"
                            Item2 = "Score" >
                        </LmsItems>
                    </div>
        Lmsitm = PreTestLettersData.map((item)=><div className="Table" style={backgroundcolor}>
                <LmsItems isItemShow={PreLettersShow}
                    
                    Item1 = {item.email}
                    Item2 = {item.Scorelist} >
                </LmsItems>
                </div>)
    };
    if (isPreSentencesDisplay){
        Lmslst = <Lmslist isStudentShow = {PreSentenceShow} Item1 = "Pre Test Sentences" ></Lmslist>;
        LmsHeader = <div className="HeaderToken">
            <LmsItems isItemShow={PreSentenceShow}
                    
                    Item1 = "Email"
                    Item2 = "Score" >
                </LmsItems>
        </div>;
        Lmsitm = PreTestSentencesData.map((item)=><div className="Table" style={backgroundcolor}>
                <LmsItems isItemShow={PreSentenceShow}
                    
                    Item1 = {item.email}
                    Item2 = {item.Scorelist} >
                </LmsItems>
                </div>)
    };
    if (isPreWordsDisplay){
        Lmslst = <Lmslist isStudentShow = {PreWordssShow}  Item1 = "Pre Test Words" ></Lmslist>;
        LmsHeader = <div className="HeaderToken">
            <LmsItems isItemShow={PreWordssShow}
                    
                    Item1 = "Email"
                    Item2 = "Score" >
                </LmsItems>

        </div>;
        Lmsitm = PreTestWordsData.map((item)=><div className="Table" style={backgroundcolor}>
                <LmsItems isItemShow={PreWordssShow}
                    
                    Item1 = {item.email}
                    Item2 = {item.Scorelist} >
                </LmsItems>
                </div>)
    };
    if (isPreStoriesDisplay){
        Lmslst = <Lmslist isStudentShow = {PreStoriessShow} Item1= "Pre Test Stories" ></Lmslist>;
        LmsHeader = <div className="HeaderToken">
            <LmsItems isItemShow={PreStoriessShow}
                    
                    Item1 = "Email"
                    Item2 = "Score"
                    Item3 = "Word Missing" >
                </LmsItems>
        </div>;
        Lmsitm = PreTestStoriessData.map((item)=><div className="Table" style={backgroundcolor}>
                <LmsItems isItemShow={PreStoriessShow}
                    
                    Item1 = {item.email}
                    Item2 = {item.Scorelist} 
                    Item3 = {item.missing}>
                </LmsItems>
                </div>)
    };
    if (stndshow) {
        Lmslst = <Lmslist isStudentShow = {isStudentShow}  Item1 = "All Student Data" ></Lmslist>;
        LmsHeader = <div className="HeaderToken"><LmsItems isItemShow={isStudentShow}
                    
                            
                            Item1 = "Username"
                            Item2 = "Joined Date"
                            Item3 = "Active" >
                        </LmsItems>
                    </div>
        Lmsitm = AllStudentData.map((item)=>
        <div className="Table" style={backgroundcolor}>
                        <LmsItems isItemShow={isStudentShow}  Item1 = {item.email} Item2 = {item.date} Item3 = {item.active} ></LmsItems>
                        <hr></hr>
                        <LmsButton GetPreTestValue={PreTestValue} GetPostTestValue={PostTestValue}
                            GetInventoryTestValue={InventoryTest} GetInterestTestValue={InterestTest} 
                            Value1={ format('{0}@{1}',item.token,"pretest")} 
                            Value2={ format('{0}@{1}',item.token,"posttest")}
                            Value3={ format('{0}@{1}',item.token,"inventorytest")}
                            Value4={ format('{0}@{1}',item.token,"interesttest")}>
                        </LmsButton> 
                </div>)
    }
    return(
        <div className="Dashconatainer">
            <img className="openclass" src={openSidebars} alt="open" onClick={OpenSidebar} width="20px" height="20px"></img>
            <img className="closeclass" src={closeSidebars} alt="close" onClick={CloseSidebar} style={closevisible} width="20px" height="20px"></img>
            <div className="sidebar" style={closebar}>
               <div className="sidebarcontent">
                    <ul onClick={ShowStudents}>All Students</ul>
                    <ul onClick={ShowPrelist}>Pretest
                        <ul className="Listshow" style={ishow}>
                            <li onClick={GetAllStudentsLetterScore}>Letters</li>
                            <li onClick={GetAllStudentsSebtenceScore}>Sentence</li>
                            <li onClick={GetAllStudentsWordScore}>Word</li>
                            <li onClick={GetAllStudentStoriesScore}>Story</li>
                        </ul>
                    </ul>
                    <ul onClick={ShowPostlist}>Post Test
                        <ul className="Listshow" style={isPosthow}>
                            <li>Letters</li>
                            <li>Sentence</li>
                            <li>Word</li>
                            <li>Story</li>
                        </ul>
                    </ul>
                    <ul onClick={ShowInventoryList}>Inventory Test
                        <ul className="Listshow" style={isinventoryhow}>
                            <li>Intelegent Test</li>
                            <li>Interest Test</li>
                        </ul>
                    </ul>
                </div>  
            </div>
            <div className="contains"> 
                <div className="HeaderTable" style={backgroundcolor}>
                    {Lmslst}
                </div>
                    {LmsHeader}
                    {Lmsitm}
            </div>
            <div className="ShowResultPopup" style={showresult}>
            <img className="closeResclass" src={closeSidebars} alt="close" onClick={CloseResSidebar} style={closeresvisible} width="20px" height="20px"></img>
                {ResultContent}
            </div>
                
        </div>
    )
};

export default LmsComp;