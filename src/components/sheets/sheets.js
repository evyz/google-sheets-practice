import React, { useEffect, useState } from "react";
import { getRooms } from "../../http/room";
import Sheet from "../sheet/Sheet";
import "./sheets.css";
import NewGrid from "../popup/newGrid/NewGrid";

const Sheets = ({ user, setUser }) => {
  const [data, setData] = useState([]);
  const [popup, setPopup] = useState(false);
  const [selectedSheet, setSelectedSheet] = useState({});

  useEffect(() => {
    getRooms().then((data) => {
      setData(data);
    });
  }, []);

  if (selectedSheet?.id) {
    return (
      <Sheet props={selectedSheet} backHandler={() => setSelectedSheet({})} />
    );
  }
  return (
    <div class='default-wrapper'>
      {popup && (
        <NewGrid
          setPopup={setPopup}
          setResult={setSelectedSheet}
          handler={() => {
            getRooms().then((data) => {
              setData(data);
            });
            setPopup(false);
          }}
        />
      )}
      <div
        className='default-cards'
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* <button className="btn btn-danger" onClick={()=>}>exit</button> */}
        <button
          type='button'
          class='btn btn-danger'
          onClick={() => {
            setUser("");
            localStorage.removeItem("nickname");
          }}
        >
          exit
        </button>
        <div>
          <button className='btn btn-success' onClick={() => setPopup(true)}>
            ADD
          </button>
        </div>

        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div
              onClick={() => setSelectedSheet(item)}
              key={item.id}
              class='card default-card'
              style={{ width: "18rem" }}
            >
              <div class='card-body'>
                <h5 class='card-title'>
                  {item?.name ? item?.name : "Таблица #" + item.id}
                </h5>
                <p class='card-text'>{item?.author}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sheets;
