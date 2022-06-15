import React from "react";
import "./StyleResult.css";

const ResultsShow=()=>{

   
    // Getting All Students data from Database
    return(
        <div className="TablContainer">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th>Header 1</th>
                        <th>Header 2</th>
                        <th>Header 3</th>
                        <th>Header 4</th>
                        <th>Header 5</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Content 1</td>
                        <td>Content 1</td>
                        <td>Content 1</td>
                        <td>Content 1</td>
                        <td>Content 1</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default ResultsShow;