import { useState } from "react";
import { login, register } from "../../http/user";
import "./Login.css";
import SystemWrapper from "../../system-components/markup/wrapper";
import SystemRow from "../../system-components/markup/row";
import Cell from "../cell/Cell";
import SystemCell from "../../system-components/markup/cell";
import SystemInput from "../../system-components/search/input";
function Login({ user, setUser }) {
  const [name, setName] = useState("");
  const [isRegisterForm, setIsRegisterForm] = useState(false);

  function handleBtnClick() {
    login(name)
      .then((data) => {
        setUser(name);
        localStorage.setItem("nickname", name);
      })
      .catch((err) => {
        alert("Ошибка при авторизации. Пользователь не был найден");
      });
  }

  function handleRegisterApi() {
    register(name).then((data) => {
      setUser(name);
      localStorage.setItem("nickname", name);
    });
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  if (isRegisterForm) {
    return (
      <div>
        <div className='Registration-window'>
          <div className='Registration-block'>
            <h1>Регистрация</h1>
            <input
              style={{ border: "none" }}
              className='regist-name'
              placeholder='Введите имя'
              value={name}
              onChange={handleNameChange}
            />
            <button
              onClick={() => handleRegisterApi()}
              type='button'
              class='btn btn-primary'
            >
              Зарегистироваться
            </button>
            <span>
              Есть аккаунт?{" "}
              <span onClick={() => setIsRegisterForm(false)}>
                Авторизуйтесь
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SystemWrapper>
      <SystemRow
        styles={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SystemCell size={8}>
          <h1>Авторизация</h1>
          <SystemInput
            value={name}
            label={"Введите имя"}
            setValue={setName}
            rules={{ notNull: true }}
          />
          <button class='btn btn-primary' onClick={handleBtnClick}>
            Вход
          </button>
          <span>
            Нет аккаунта?{" "}
            <span onClick={() => setIsRegisterForm(true)}>
              Зарегистрирутесь
            </span>
          </span>
        </SystemCell>
      </SystemRow>
    </SystemWrapper>
    // {    <div className='Registration-window'>
    //       <div className='Registration-block'>
    //
    //       </div>
    //     </div>}
  );
}
export default Login;
