import React, { useEffect, useState } from "react";
import "./markup.css";

const SystemCell = ({ children, size }) => {
  size = size ? size : 3;

  const [columnSize, setColumnSize] = useState(94);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth === 0) {
        return;
      } else {
        let check = window.innerWidth;
        if (check < 768) {
          setColumnSize(68);
        }
      }
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width: columnSize * size }} className='system_cell'>
      {children}
    </div>
  );
};

export default SystemCell;
