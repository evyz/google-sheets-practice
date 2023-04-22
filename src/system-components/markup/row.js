import React from "react";
import "./markup.css";

const SystemRow = ({ children, styles }) => {
  return (
    <div className='system_row' style={{ ...styles }}>
      {children}
    </div>
  );
};

export default SystemRow;
