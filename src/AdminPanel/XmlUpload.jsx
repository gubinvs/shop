import React, { useState } from "react";

export default function XmlUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== "text/xml" && !selected.name.endsWith(".xml")) {
      setMessage("Пожалуйста, выберите XML файл!");
      setFile(null);
      return;
    }
    setFile(selected);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Файл не выбран!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8080/api/KeazXmlUpload/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Ошибка сервера: ${response.status} ${errText}`);
      }

      const result = await response.json();
      setMessage(`Файл успешно загружен: ${result.fileName || "OK"}`);
    } catch (err) {
      setMessage(`Ошибка при загрузке: ${err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", padding: 20, border: "1px solid #ccc", borderRadius: 8 }}>
      <h3>Загрузка XML файла</h3>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xml,text/xml" onChange={handleFileChange} />
        <button type="submit" style={{ marginTop: 10 }}>Отправить</button>
      </form>
      {message && <p style={{ marginTop: 10 }}>{message}</p>}
    </div>
  );
}
