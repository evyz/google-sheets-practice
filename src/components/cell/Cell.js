import React, { memo } from "react";

const Cell = ({ props }) => {
  return (
    <td style={{ minWidth: 70, minHeight: 50 }}>
      {props.value ? props.value : <input placeholder='Не указано' />}
    </td>
  );
};

export default memo(Cell);
