import React, { useEffect, useState } from "react";
import { getRooms } from "../../http/room";
import Sheet from "../sheet/Sheet";

const Sheets = () => {
  const [data, setData] = useState([]);

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
      <div
        className='default-cards'
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <div>
          <button className='btn btn-success'>ADD</button>
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
