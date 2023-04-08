import React, { memo } from "react";
function Users({ connections }) {
    console.log(connections)
  return (
    <div style={{top:"0",left:"10px",position:"absolute",display:"flex",flexDirection:"column"}}>
        <div style={{flexDirection:"row"}}>
      <span>{connections && connections.length>0 && connections.map(user=><>{user}
        <span style={{color:"red",fontWeight:"700",fontSize:"20px"}} aria-hidden="true">&times;</span></>)}</span>
        
        </div>
    </div>
  );
}
export default memo(Users);
