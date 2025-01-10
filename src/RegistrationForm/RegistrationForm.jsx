import React, { useState } from "react";

import ApiUrl from '../js/ApiUrl.js';

import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(ApiUrl);

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
    .then((data) => console.log(data))
    .catch((error) => console.error(error));

    setEmail("");
    setPassword("");
  };

  return (
    <div className="container">
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
  );
};

export default RegistrationForm;