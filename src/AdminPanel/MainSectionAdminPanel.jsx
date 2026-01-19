import { useState } from "react";
import "./mainSectionAdminPanel.css";
import ApiUrl from "../js/ApiUrl";
import AdminMailer from "./AdminMailer/AdminMailer";



const MainSectionAdminPanel = () => {

    const token = "MySuperToken123";

    const [updateResult, setUpdateResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateKeazQuantityItem = () => {
        setLoading(true);
        setError(null);
        setUpdateResult(null);

        fetch(`${ApiUrl}/api/keaz/run?token=${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
            .then(res => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then(data => {
                setUpdateResult(data);
            })
            .catch(err => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="main-section-admin-panel">
            <h4 className="main-section-admin-panel__title">
                Обновление данных о цене и количестве на складах KEAZ:
            </h4>

            <button
                className="button-update"
                onClick={updateKeazQuantityItem}
                disabled={loading}
            >
                {loading ? "Обновление..." : "Обновить данные"}
            </button>

            {/* Ошибка */}
            {error && (
                <div style={{ color: "red", marginTop: "10px" }}>
                    Ошибка: {error}
                </div>
            )}

            {/* Результат */}
            {updateResult && (
                <div style={{ marginTop: "10px" }}>
                    <h5>Результат обновления:</h5>
                    <pre>
                        {JSON.stringify(updateResult, null, 2)}
                    </pre>
                </div>
            )}

            <div className="admin-mailer__container">
                <AdminMailer
                    title={"Рассылка по проверенной базе:"}
                    urlRegust={"http://31.129.97.48:1100/api/Upload/upload-excel"}
                />
                <br /><br />
                <AdminMailer
                    title={"Рассылка по базе на отсев:"}
                    urlRegust={"http://31.129.97.48:1110/api/Upload/upload-excel"}
                />
            </div>
        </div>
    );

};

export default MainSectionAdminPanel;