import { useCallback, useEffect, useRef, useState } from "react";
import Table from "react-bootstrap/Table";
import Cell from "../cell/Cell";
import Users from "../sheet/Users";
import "./Sheet.css";
import Settings from "./Settings";
import Online from "./components/Online";
import {
  addNewField,
  getConnectionsToThisGrid,
  getTable,
  inviteUser,
} from "../../http/room";
import SystemPopup from "../../system-components/functional/popup";

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
  const [settings, setSettings] = useState(false);

  const [focusedField, setFocusedField] = useState(null);
  const [activeUser, setActiveUser] = useState(false)

  
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
  
  const [isPaused, setIsPaused] = useState(false);
  const [response, setResponse] = useState(null);
  const [status, setStatus] = useState("");
  const ws = useRef(null);
  
  const [editors, setEditors] = useState([]);
  
  useEffect(() => {
    if (!isPaused) {
      ws.current = new WebSocket(
        "ws://localhost:8080/rooms" +
        "?nickname=" +
        localStorage.getItem("nickname") +
          "&roomId=" +
          props?.id
      ); // создаем ws соединение
      ws.current.onopen = () => setStatus("Соединение открыто"); // callback на ивент открытия соединения
      ws.current.onclose = () => setStatus("Соединение закрыто"); // callback на ивент закрытия соединения

      gettingData();
    }
    
    return () => ws.current.close(); // кода меняется isPaused - соединение закрывается
  }, [ws, isPaused]);
  
  // setTimeout(function() {   
  //   if(message?.type == Users?.connections){
  //     setActiveUser(true)
  //   }
  // }, 1000);
  const gettingData = useCallback(() => {
    if (!ws.current) return;
    
    ws.current.onmessage = (e) => {
      //подписка на получение данных по вебсокету
      if (isPaused) return;
      const message = JSON.parse(e.data);
      if (message?.type === "select_field") {
        let arr = [];
        if (editors.length === 0) {
          arr.push(message?.params);
        } else {
          editors.forEach((editor) => {
            if (editor?.nickname === message?.params?.nickname) {
            } else {
              arr.push(editor);
            }
          });
        }
        setEditors(arr);
      }
      setResponse(message);
    };
  }, [isPaused]);

  useEffect(() => {
    if (focusedField) {
      ws?.current?.send(
        JSON.stringify({ type: "select_field", params: { id: focusedField } })
      );
    }
  }, [focusedField]);

  return (
    <div>
      {/* {activeUser && <div className="activeUse  r">В сети</div>} */}
      <div className="activeUser">В сети</div>
      {settings && (
        <div className='popup' onClick={() => setSettings(false)}>
          <div className='popupContainer' onClick={(e) => e.stopPropagation()}>
            <Settings />
          </div>
        </div>
      )}
      {editors?.map((editor) => (
        <li>
          {editor?.nickname} {editor?.id}
        </li>
      ))}
      {friendsPopup && (
        <SystemPopup value={friendsPopup} setValue={setFriendsPopup}>
          <Users connections={connections}/>
          <h3>Your friends</h3>
          <input
            className={`form-control form-control-lg ${click ? "yellow" : ""}`}
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
        </SystemPopup>
      )}
      <div style={{ width: "90%", height: "10vh", position: "relative" }}>
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
          onClick={() => setSettings(true)}
          class='btn btn-light'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            class='bi bi-gear-fill'
            viewBox='0 0 16 16'
          >
            <path d='M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z' />
          </svg>
        </button>
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
        <Online />
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
                  {row.length > 0 &&
                    row.map((cell) => (
                      <Cell
                        editors={editors}
                        props={cell}
                        focusedField={focusedField}
                        setFocusedField={setFocusedField}
                      />
                    ))}
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
