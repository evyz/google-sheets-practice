import "./button.css";
import React, { useEffect, useState } from "react";

const notNullValidation = (deps) => {
  if (deps && deps.length > 0) {
    let status = true;

    for (let dep of deps) {
      if (dep && dep.length > 0) {
        status = false;
      } else {
        status = true;
        break;
      }
    }

    return status;
  }
};

function SystemButton({ children, onClick, deps, rules }) {
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (rules?.notNull) {
      setDisabled(notNullValidation(deps));
    }
  }, [deps]);

  return (
    <button disabled={disabled} class='btn btn-success' onClick={onClick}>
      {children}
    </button>
  );
}
export default SystemButton;
