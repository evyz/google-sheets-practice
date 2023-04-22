import React from "react";

const SystemWrapper = ({ children, styles }) => {
  return (
    <div className='system_out_wrapper'>
      <div className='system_wrapper' style={{ ...styles }}>
        {children}
      </div>
    </div>
  );
};

export default SystemWrapper;
