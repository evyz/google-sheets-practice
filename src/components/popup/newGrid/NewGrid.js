import React, { useState } from "react";
import { createRoom } from "../../../http/room";

const NewGrid = ({ setPopup, setResult, handler }) => {
  const [name, setName] = useState("");

  function createRoomHandler() {
    createRoom(name).then((data) => {
      setResult(data);
      handler && handler();
    });
  }

  return (
    <div>
        <h3>Enter the name of the new project</h3>
        <input
          class='form-control form-control-lg'
          style={{ width: "50%" }}
          type='text'
          placeholder='Here'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={createRoomHandler} className='btn btn-success'>
          Confirm
        </button>
      </div>
  );
};

export default NewGrid;
