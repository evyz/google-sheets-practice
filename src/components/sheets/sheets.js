import React, { useEffect, useState } from "react";
import { getRooms } from "../../http/room";
import Sheet from "../sheet/Sheet";
import "./sheets.css";

const Sheets = () => {
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
    <div class="default-wrapper">
      {popup && (
        <div className="popup" onClick={() => setPopup(false)}>
          <div
            className="popupContainer"
            onClick={(e) => e.stopPropagation()}
          ><h3>Enter the name of the new project</h3>
            <input class="form-control form-control-lg" style={{width:"50%"}} type="text" placeholder="Here"/>
            <button className="btn btn-success">
            Confirm
          </button></div>
        </div>
      )}
      <div
        className="default-cards"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {/* <button className="btn btn-danger" onClick={()=>}>exit</button> */}
        <div>
          <button className="btn btn-success" onClick={() => setPopup(true)}>
            ADD
          </button>
        </div>

        {data &&
          data.length > 0 &&
          data.map((item) => (
            <div
              onClick={() => setSelectedSheet(item)}
              key={item.id}
              class="card default-card"
              style={{ width: "18rem" }}
            >
              <div class="card-body">
                <h5 class="card-title">
                  {item?.name ? item?.name : "Таблица #" + item.id}
                </h5>
                <p class="card-text">{item?.author}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Sheets;
