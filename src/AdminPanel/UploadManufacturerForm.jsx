import React, { useState } from "react";

const UploadManufacturerForm = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [unit, setUnit] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!manufacturer || !unit || !file) {
      setMessage("❗Заполните все поля и прикрепите файл.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("manufacturer", manufacturer);
      formData.append("unit", unit);
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:8080/api/UploadData", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }

      const data = await response.json();
      setMessage(`✅ Успешно отправлено: ${data.message || "файл загружен"}`);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      setMessage("❌ Ошибка при загрузке файла");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container max-w-md mx-auto bg-white p-6 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-center">Отправка данных</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Выбор производителя */}
        <div>
          <label className="block text-gray-700 mb-1">Производитель:</label>
          <select
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="">Выберите производителя</option>
            <option value="Schneider">Schneider Electric</option>
            <option value="TDM">KEAZ</option>
            <option value="IEK">IEK</option>
            <option value="EKF">EKF</option>
          </select>
        </div>

        {/* Загрузка файла */}
        <div>
          <label className="block text-gray-700 mb-1">Прикрепить файл:</label>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            className="w-full border p-2 rounded-md"
          />
        </div>

        {/* Кнопка отправки */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Отправка..." : "Отправить"}
        </button>
      </form>

      {/* Сообщение пользователю */}
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default UploadManufacturerForm;
