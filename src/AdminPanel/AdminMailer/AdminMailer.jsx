import { useState } from "react";
import "./adminMailer.css";

const AdminMailer = ({ title, urlRegust }) => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [color, setColor] = useState("black");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setResult("Пожалуйста, выберите файл.");
      setColor("red");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      setResult("Загрузка...");
      setColor("black");

      const response = await fetch(urlRegust, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка при загрузке файла: ${response.statusText}`);
      }

      const text = await response.text();
      setResult(`Файл успешно отправлен! Ответ сервера: ${text}`);
      setColor("green");
    } catch (error) {
      setResult(`Ошибка: ${error.message}`);
      setColor("red");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>{title}</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {result && <div style={{ color }}>{result}</div>}
    </>
  );
};

export default AdminMailer;
