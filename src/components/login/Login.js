import { useState } from "react";
import { login, register } from "../../http/user";
import "./Login.css";
import SystemWrapper from "../../system-components/markup/wrapper";
import SystemRow from "../../system-components/markup/row";
import Cell from "../cell/Cell";
import SystemCell from "../../system-components/markup/cell";
import SystemInput from "../../system-components/search/input";
import SystemButton from "../../system-components/functional/button"
function Login({ user, setUser }) {
  const [name, setName] = useState("");
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  // const [ bntColor, setBtnColor] = useState

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
            <h1>Регистрация</h1>
            <SystemInput
              setValue={setName}
              value={name}
              label={"Введите имя"}
              rules={{ notNull: true }}
            />
            <SystemButton onClick={() => handleRegisterApi()}>
              Зарегистрироваться
            </SystemButton>
            {/* {name == "" ?
                        <button
                        disabled = {true}
                        class="btn btn-secondary"
                      >
                        Зарегистироваться
                      </button>
                        :
                          <button
                          onClick={() => handleRegisterApi()}
                          type="button"
                          class="btn btn-success"
                        >
                          Зарегистироваться
                        </button>
            } */}
            <span>
              Есть аккаунт?{" "}
              <span onClick={() => setIsRegisterForm(false)}>
                Авторизуйтесь
              </span>
            </span>
          </SystemCell>
        </SystemRow>
      </SystemWrapper>
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
          <button class="btn btn-success" onClick={handleBtnClick}>
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
  );
}
export default Login;
