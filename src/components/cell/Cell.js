import React, { memo } from "react";

const Cell = ({ props }) => {
  return <td>{props.value}</td>;
};

export default memo(Cell);
