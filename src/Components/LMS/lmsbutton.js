import React ,{useState} from "react";



const LmsButton=(props)=>{
    return(
        <div className="ButtonItems" style={props.isItemShow}>
            <li style={{marginLeft:"10px"}}><button onClick={props.GetPreTestValue} value={props.Value1}>PreTest</button></li>
            <li style={{marginLeft:"10px"}}><button onClick={props.GetPostTestValue} value={props.Value2}>PostTest</button></li>
            <li style={{marginLeft:"10px"}}><button onClick={props.GetInventoryTestValue} value={props.Value3}>Inventory</button></li>
            <li style={{marginLeft:"10px"}}><button onClick={props.GetInterestTestValue} value={props.Value4}>Interest</button></li>
        </div>
    );
}

export default LmsButton;