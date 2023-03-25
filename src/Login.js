import {useState} from "react";
import "./Login.css";
function Login({user,setUser}){
    const [name, setName] = useState("");
    function handleBtnClick() {
        setUser(name)
        localStorage.setItem("nickname",name)
      }
      function handleNameChange(event) {
        setName(event.target.value);
      }
    return (
        <div className="Registration-window">
        <div className="Registration-block">
          <h1>Регистрация</h1>
          <input
            className="regist-name"
            placeholder="Введите имя"
            value={name}
            onChange={handleNameChange}
          />
          <button className="green-batton" onClick={handleBtnClick}>
            Вход
          </button>
        </div>
      </div>
    )
}
export default Login;