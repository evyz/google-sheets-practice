import "./popup.css"
import React from "react";
function SystemPopup ({children, value, setValue}){
    if(value){
        return (
            <div className="popup" onClick={()=>setValue(false)}>
                <div className="popupContainer" onClick={(e)=>e.stopPropagation()}>
                {children}
                </div>
            </div>
        )    
    }
}
export default SystemPopup;