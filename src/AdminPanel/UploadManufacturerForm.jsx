import React, { useState } from "react";
import { motion } from "framer-motion";
import { Upload, FileUp, CheckCircle2, AlertCircle } from "lucide-react";

const UploadManufacturerForm = () => {
  const [manufacturer, setManufacturer] = useState("");
  const [unit, setUnit] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!manufacturer || !unit || !file) {
      setMessage("⚠️ Заполните все поля и прикрепите файл.");
      setStatus("error");
      return;
    }

    setLoading(true);
    setMessage("");
    setStatus("");

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
      setMessage(`✅ ${data.message || "Файл успешно загружен"}`);
      setStatus("success");
      setManufacturer("");
      setUnit("");
      setFile(null);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
      setMessage("❌ Ошибка при загрузке файла");
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-lg mx-auto mt-10 bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-md rounded-3xl p-8"
    >
      <div className="text-center mb-6">
        <Upload className="mx-auto text-blue-600 w-10 h-10 mb-3" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Загрузка данных поставщика
        </h2>
        <p className="text-gray-500 text-sm mt-1">
          Укажите производителя, единицу измерения и прикрепите файл
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Производитель */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Производитель
          </label>
          <select
            value={manufacturer}
            onChange={(e) => setManufacturer(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">Выберите производителя</option>
            <option value="IEK">IEK</option>
            <option value="EKF">EKF</option>
            <option value="TDM">TDM</option>
            <option value="Schneider Electric">Schneider Electric</option>
          </select>
        </div>

        {/* Единица измерения */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Единица измерения
          </label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          >
            <option value="">Выберите единицу</option>
            <option value="шт">Штуки</option>
            <option value="м">Метры</option>
            <option value="кг">Килограммы</option>
            <option value="упак">Упаковки</option>
          </select>
        </div>

        {/* Файл */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Прикрепить файл
          </label>

          <label className="group flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl p-6 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition text-center">
            <FileUp className="text-blue-500 w-8 h-8 mb-2 group-hover:scale-110 transition" />
            <span className="text-gray-500 text-sm">
              {file ? file.name : "Нажмите, чтобы выбрать файл (.xlsx, .xls, .csv)"}
            </span>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Кнопка */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-medium shadow-sm transition disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="animate-pulse">Отправка...</span>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Отправить
            </>
          )}
        </motion.button>
      </form>

      {/* Сообщение */}
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-5 p-3 rounded-xl text-sm flex items-center justify-center gap-2 ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status === "success" ? (
            <CheckCircle2 className="w-5 h-5" />
          ) : (
            <AlertCircle className="w-5 h-5" />
          )}
          {message}
        </motion.div>
      )}
    </motion.div>
  );
};

export default UploadManufacturerForm;
