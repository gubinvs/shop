import React, { useState } from "react";
import ApiUrl from '../js/ApiUrl.js';
import "./RegistrationForm.css";

const AuthorizationForm = () => {
  
  const newLogin = localStorage.getItem("newLogin"); // если регистрировались заполним сразу поле логина
  const [email, setEmail] = useState(newLogin);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
  fetch(ApiUrl + "/api/Auth", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

  .then((response) => {
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
  })
  .then((data) => {
    // если токен есть
    if (data.token !== undefined) {
        //console.log(data.token);
        // Записываем токет в localStorage
        localStorage.setItem("token", data.token); // Сохраняем токен
        //console.log("В локал =" + localStorage.getItem("token"));
        // Переадресовываем на защищенную страницу
        window.location.href = "/Personal"; // Переход на страницу авторизации
    } else {
        setMessage(data.message); // если токена нет выводим сообщение
    }
    
  })
  .catch((error) => console.log(error));

        // Очистка формы
        // setEmail("");
        // setPassword("");
  
  };
  if (message === "") {
    return (
        <div className="registration-form_container">
          <div className="form-block">
            <h2 className='form-block__title'>Авторизация пользователя</h2>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="email"
                className="input"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                className="input"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className="button">
                Войти
              </button>
            </form>
            <div className="registration-form__registration-link" onClick={()=>{window.location.href="/Registration"}}>Регистрация</div>
          </div>
        </div>
      );
  } 
  else 
  {
    const handleRedirect = () => {
      window.location.href = "/Registration"; // Переход на страницу авторизации
      //navigate("/Autorization")
    };
    const handleRedirectPassword = () => {
      window.location.href = "/UpdatePassword"; // Переход на страницу авторизации
      //navigate("/Autorization")
    };
    
    return (
      <div className="container">
        <div className="form-block">
          <h2>Авторизация пользователя</h2>
          <form onSubmit={handleSubmit} className="form">
            <input
              type="email"
              className="input"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="button">
              Войти
            </button>
          </form>
        </div>
        <div className="form-block form block-message">
          <h2> {message}</h2>
          <button onClick={handleRedirect} type="submit" className="button">
            Пройти регистрацию
          </button>
          <button onClick={handleRedirectPassword} type="submit" className="button">
            Восстановить пароль
          </button>
        </div>
      </div>
    );
  };
};

export default AuthorizationForm;