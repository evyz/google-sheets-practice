import React, { memo, useEffect, useState } from "react";
import "./Cell.css";

const Cell = ({ props, focusedField, setFocusedField, editors }) => {
  const [value, setValue] = useState("");
  const [isFocused, setFocused] = useState(false);
  const [isContextClicked, setIsContextClicked] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setFocusedField(props?.id);
    } else {
      setFocusedField(null);
    }
  }, [isFocused]);

  useEffect(() => {
    if (props?.value) {
      setValue(props?.value);
    }
  }, [props]);

  return (
    <td
      className={`default_cell ${isFocused && "default_cell_active_me"}`}
      id={props?.id}
      onBlur={(e) => {
        setFocused(false);
      }}
      onFocus={() => setFocused(true)}
      onContextMenu={(e) => {
        e.preventDefault();
        setIsContextClicked(!isContextClicked);
      }}
      style={{
        border: editors?.find((editor) => editor?.id === props?.id)
          ? `1px solid orange`
          : "",
      }}
    >
      {isContextClicked && (
        <div className='default_cell_context_wrapper'>
          <li>Удалить</li>
          <li>Удалить</li>
          <li>Удалить</li>
        </div>
      )}

      <input
        className='default_cell_input'
        value={value}
        onBlur={(e) => {
          setFocused(false);
        }}
        onFocus={() => setFocused(true)}
        onChange={(e) => setValue(e.target.value)}
        style={{
          backgroundColor: "rgba(240, 248, 255, 0)",
          border: "none",
          width: "100%",
          outline: "none",
        }}
      />
    </td>
  );
};

export default memo(Cell);
