import { useState } from "react";
import "./updateQuantityKeaz.css";
import ApiUrl from "../../js/ApiUrl";

const UpdateQuantityKeaz = () => {
    const [result, setResult] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const runUpdate = async () => {
        setLoading(true);
        setResult("");
        setError("");

        try {
            const response = await fetch(
            `${ApiUrl}/api/keaz/run?token=MySuperToken123`,
                {
                    method: "POST",
                }
            );

            const text = await response.text();

            if (!response.ok) {
                throw new Error(text || "Ошибка запроса");
            }

            setResult(text);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <h2 className="keaz-update__container">Обновление данных о количестве товаров KEAZ</h2>
            <div className="keaz-update__button">
                <button onClick={runUpdate} disabled={loading}>
                    {loading ? "Выполняется..." : "Запустить обновление KEAZ"}
                </button>

                {result && <div className="success">{result}</div>}
                {error && <div className="error">{error}</div>}
            </div>
        </>
    );
};

export default UpdateQuantityKeaz;