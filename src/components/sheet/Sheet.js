import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Cell from "../cell/Cell";
import Users from "../sheet/Users";
import "./Sheet.css";
import {
  addNewField,
  getConnectionsToThisGrid,
  getTable,
  inviteUser,
} from "../../http/room";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

function Sheet({ props, backHandler }) {
  const [matrix, setMatrix] = useState([]);
  const [counts, setCounts] = useState({ x: 13, y: 4 });
  const [isLoading, setIsLoading] = useState(true);
  const [connections, setConnections] = useState([]);
  const [friendsPopup, setFriendsPopup] = useState(false);
  const [friendName, setFriendName] = useState("");
  const [click, setClick] = useState(false);
  const [res, setRes] = useState([]);

  useEffect(() => {
    if (props?.id) {
      getTable(props?.id).then((data) => {
        if (data?.fields) {
          setRes(data?.fields);
          setCounts({ y: data?.fields[0].length, x: data?.fields.length });
        }
      });
      getConnectionsToThisGrid(props.id).then((data) => {
        setConnections(data);
      });
    }
  }, [props]);

  const handleButtonClick = (event, position) => {
    if (event === "add") {
      if (position === "x") {
        setCounts((prev) => {
          return { ...prev, x: prev[position] + 1 };
        });
      } else {
        setCounts((prev) => {
          return { ...prev, y: prev[position] + 1 };
        });
      }
      addNewField({ id: props?.id, type: event, position });
    }
  };

  useEffect(() => {
    setIsLoading(true);
    let arr = [];
    for (let i = 0; i < counts.x; i++) {
      let obj = [];
      for (let y = 0; y < counts.y; y++) {
        obj.push({ id: uuidv4(), value: res && res?.[i] && res?.[i]?.[y] });
      }
      arr.push(obj);
    }

    setMatrix(arr);
    setIsLoading(false);
  }, [counts]);

  return (
    <div>
      {friendsPopup && (
        <div className='popup' onClick={() => setFriendsPopup(false)}>
          <div
            className='popupContainer'
            style={{ position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <Users connections={connections} />
            <h3>Your friends</h3>
            <input
              className={`form-control form-control-lg ${
                click ? "yellow" : ""
              }`}
              style={{ width: "50%" }}
              type='text'
              placeholder='Name'
              onChange={(e) => setFriendName(e.target.value)}
              onClick={() => setClick(true)}
            />
            <button
              className='btn btn-warning'
              onClick={() => {
                inviteUser(props.id, friendName).then((data) =>
                  console.log(data)
                );
                setFriendName("");
              }}
            >
              Add new friend
            </button>
          </div>
        </div>
      )}
      <div style={{ width: "100%", height: "10vh" }}>
        <button
          type='button'
          class='btn btn-danger'
          onClick={() => backHandler()}
        >
          Закрыть таблицу
        </button>
        {props.author === localStorage.getItem("nickname") ? (
          <button
            type='button'
            class='btn btn-warning'
            onClick={() => setFriendsPopup(true)}
          >
            friends
          </button>
        ) : (
          ""
        )}
        <button
          type='button'
          class='btn btn-light'
          onClick={() => handleButtonClick("add", "y")}
        >
          Добавить Вертикаль
        </button>
        <button
          type='button'
          class='btn btn-light'
          onClick={() => handleButtonClick("add", "x")}
        >
          Добавить Горизонталь
        </button>
      </div>
      {!isLoading && matrix.length > 0 && (
        <div className='default-table'>
          <Table striped bordered hover>
            <thead>
              <tr>
                {matrix[0].map((item, index) => (
                  <td>{index + 1}</td>
                ))}
              </tr>
            </thead>

            <tbody>
              {matrix.map((row) => (
                <tr>
                  {row.length > 0 && row.map((cell) => <Cell props={cell} />)}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
export default Sheet;
