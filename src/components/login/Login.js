import { useState } from "react";
import { login } from "../../http/user";
import "./Login.css";
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
    // функция на регистрацию

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
        style={{border:"none"}}
          className='regist-name'
          placeholder='Введите имя'
          value={name}
          onChange={handleNameChange}
        />
                <input
                style={{width:"300px",border:"none",margin:"5px"}}
          className='regist-name'
          placeholder='Введите email'
          value={name}
          onChange={handleNameChange}
        />
<button type="button" class="btn btn-primary">Вход</button>
        <span>
          Есть аккаунт?{" "}
          <span onClick={() => setIsRegisterForm(false)}>Авторизуйтесь</span>
        </span>
      </div>
    </div>
        {/* Сделать форму регистрации здесь */}

      </div>
    );
  }

  return (
    <div className='Registration-window'>
      <div className='Registration-block'>
        <h1>Авторизация</h1>
        <input
        style={{border:"none",margin:"5px"}}
          className='regist-name'
          placeholder='Введите имя'
          value={name}
          onChange={handleNameChange}
        />
        <button class="btn btn-primary" onClick={handleBtnClick}>
          Вход
        </button>

        <span>
          Нет аккаунта?{" "}
          <span onClick={() => setIsRegisterForm(true)}>Зарегистрирутесь</span>
        </span>
      </div>
    </div>
  );
}
export default Login;
