import React, { useState, useEffect } from "react";
import ApiUrl from '../js/ApiUrl.js';
import "./RegistrationForm.css";
import { useNavigate } from "react-router-dom";

const UpdatePassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(ApiUrl + "/api/UpdatePassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            setMessage("Пароль отправлен на почту");
        })
        .catch((error) => {
            setMessage("Ошибка при отправке. Попробуйте снова.");
            console.error(error);
        });
    };

    // Redirect effect
    useEffect(() => {
        if (message === "Пароль отправлен на почту") {
            const timer = setTimeout(() => {
                navigate('/Authorization');
            }, 3000); // 3 секунды

            return () => clearTimeout(timer); // Очистка таймера при размонтировании
        }
    }, [message, navigate]);

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
                {message && <p style={{ marginTop: '15px', color: 'green' }}>{message}</p>}
            </div>
        </div>
    );
};

export default UpdatePassword;
