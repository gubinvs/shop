import React, { useState } from "react";
import ApiUrl from '../js/ApiUrl.js';
import "./RegistrationForm.css";
import { data } from "react-router-dom";


const UpdatePassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    
    fetch(ApiUrl + "/api/UpdatePassword", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email}),
    
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

    return (
        <div className="registration-form_container">
          <div className="form-block">
            <h2>Восстановление пароля</h2>
            <form onSubmit={handleSubmit} className="form">
              <input
                type="email"
                className="input"
                placeholder="Введите email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="button">
                Сбросить пароль
              </button>
            </form>
          </div>
        </div>
      );

}

export default UpdatePassword;