import React, { memo, useState } from "react";

const Cell = ({ props }) => {
  const [value, setValue] = useState(props.value ? props.value : "");

  console.log(props.value);

  return (
    <td style={{ minWidth: 70, minHeight: 50 }}>
      {props.value ? (
        props.value
      ) : (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={{ backgroundColor: "rgba(240, 248, 255, 0)", border: "none" }}
          placeholder='Не указано'
        />
      )}
    </td>
  );
};

export default memo(Cell);
