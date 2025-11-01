// Готовый вариант с IndexedDB, чтобы реально хранить 
// все 34 000 объектов и сразу использовать их при загрузке без повторного запроса.
// Для использования необходимо установить библиотеку
// npm install idb
// ✅ Преимущества этого подхода
// Новые элементы добавляются автоматически.
// Существующие элементы обновляются, например, цена или количество.
// Все данные хранятся в IndexedDB — браузер не перегружается даже при 34 000+ объектов.
// Стейт React всегда синхронизирован с базой.
// Можно легко расширять: например, через setInterval делать периодическое обновление с API.

// db.js
// db.js
import { openDB } from "idb";

const DB_NAME = "NomenclatureDB";
const STORE_NAME = "items";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

// Добавление или обновление элементов
export async function saveOrUpdateItems(items) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  for (const item of items) {
    const existing = await tx.store.get(item.id);
    if (!existing) {
      // Новый элемент
      tx.store.put(item);
    } else {
      // Существующий элемент — обновляем все поля
      tx.store.put({ ...existing, ...item });
    }
  }
  await tx.done;
}

export async function getAllItems() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}
