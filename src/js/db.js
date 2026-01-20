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

// Получение всех элементов
export async function getAllItems() {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

// Добавление, обновление и удаление элементов
export async function saveOrUpdateItems(items) {
  const db = await getDB();
  const tx = db.transaction(STORE_NAME, "readwrite");
  const store = tx.store;

  // Берём все ключи из хранилища
  const allExistingKeys = await store.getAllKeys();
  const existingIdsSet = new Set(allExistingKeys);

  for (const item of items) {
    // Приводим id к числу, чтобы совпадал с ключом
    const id = Number(item.id);
    await store.put({ ...item, id });
    existingIdsSet.delete(id); // этот элемент оставляем
  }

  // Удаляем все, которых нет в новом списке
  for (const idToDelete of existingIdsSet) {
    await store.delete(idToDelete);
  }

  await tx.done;
}
