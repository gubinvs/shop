import React, { useState } from "react";
import ApiUrl from '../js/ApiUrl.js';
import "./RegistrationForm.css";
import { data } from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  
  fetch(ApiUrl + "/api/Registration", {
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
  .then((data) => setMessage(data.message))
  .catch((error) => setMessage(data.message));

    // Очистка формы
  // setEmail("");
  // setPassword("");
  
  };
  if (message == "") {
    return (
        <div className="registration-form_container">
          <div className="form-block">
            <h2>Регистрация пользователя</h2>
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
                Зарегистрироваться
              </button>
            </form>
          </div>
        </div>
      );
  } 
  else 
  {
    const handleRedirect = () => {
      window.location.href = "/Autorization"; // Переход на страницу авторизации
      //navigate("/Autorization")
    };
    return (
      <div className="container">
        <div className="form-block">
          <h2>Регистрация пользователя</h2>
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
              Зарегистрироваться
            </button>
          </form>
        </div>
        <div className="form-block form block-message">
          <h2> {message}</h2>
          <button onClick={handleRedirect} type="submit" className="button">
            Пройдите авторизацию
          </button>
        </div>
      </div>
    );
  };
};

export default RegistrationForm;