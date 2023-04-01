import React, { memo } from "react";

const Cell = ({ props }) => {
  return (
    <td style={{ minWidth: 70, minHeight: 50 }}>
      {props.value ? props.value : <input style={{backgroundColor : "rgba(240, 248, 255, 0)",border : "none"}} placeholder='Не указано' />}
    </td>
  );
};

export default memo(Cell);
