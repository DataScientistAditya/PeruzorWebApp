import React from "react";
import "./About.css";


const AboutPage=()=>{
    return(
        <div className="AboutContainer">
            <div className="HeaderConatiner">
                <h1>About</h1>
            </div>
            <div className="ContentContainer">
               <li> <div className="Content">
                    <h1>Summary</h1>
                <p>Peruzor is a reading assessment test, that seeks to identify the reading level of the user.</p>
                </div>
                </li>
                <li>
                    <div className="Content">
                        <h1>Contents</h1>
                    <p>There is a Pre-Test, Multiple Intelligence Test, an Interest Inventory Test and later the Intervention.</p>
                    <br></br>
                    <p>After the Pre-Test is completed, users can complete the Interest Inventory and the Multiple Intelligence Tests. The information gathered is then used to design an individualized Intervention program.</p>
                    <br></br>
                    <p>Through this targeted instruction, users are provided with activities, exercises and games, designed to fix the issues identified by the Pre-Test to improve reading and reading comprehension. At the end of the intervention, users are then giving the Post-test.</p>
                    </div>
                </li>
            </div>
        </div>
    )
}

export default AboutPage;