import { useState } from "react";

const menuItems = [
  { title: "1. Общие положения", id: "general" },
  { title: "2. Авторизация", id: "auth" },
  { title: "3. Работа с сервером", id: "server" },
  { title: "4. Версионирование", id: "versioning" },
  { title: "5. API-методы", id: "api-methods", sub: [
    { title: "5.1. API для отправки данных", id: "post-api" },
    { title: "5.2. API для получения данных", id: "get-api" },
  ] },
];

const Sidebar = ({ onSelect }) => (
  <nav className="w-64 bg-gray-900 text-white p-4 border-r h-full overflow-y-auto">
    <ul>
      {menuItems.map((item) => (
        <li key={item.id} className="mb-2">
          <button className="text-left w-full text-lg font-semibold hover:text-yellow-400 transition" onClick={() => onSelect(item.id)}>
            {item.title}
          </button>
          {item.sub && (
            <ul className="ml-4 mt-2">
              {item.sub.map((subItem) => (
                <li key={subItem.id}>
                  <button className="text-left w-full text-gray-300 hover:text-yellow-300 transition" onClick={() => onSelect(subItem.id)}>
                    {subItem.title}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </nav>
);

const Content = ({ section }) => {
  const sections = {
    general: (
      <Section title="1. Общие положения">
        <p>Взаимодействие происходит по протоколу HTTPS.</p>
        <CodeBlock>POST https://ИмяСервера/ИмяПриложения/Версия/Группа/ИмяМетода</CodeBlock>
        <CodeBlock>GET https://ИмяСервера/ИмяПриложения/Версия/Группа/ИмяМетода?Параметр1&Параметр2</CodeBlock>
      </Section>
    ),
    auth: <Section title="2. Авторизация" />,
    server: <Section title="3. Работа с сервером" />,
    versioning: <Section title="4. Версионирование" />,
    "post-api": <Section title="5.1 API для отправки данных" />,
    "get-api": <Section title="5.2 API для получения данных" />,
  };
  return <div className="p-6 bg-gray-50 rounded shadow-md">{sections[section] || <Section title="Выберите раздел" />}</div>;
};

const Section = ({ title, children }) => (
  <div>
    <h2 className="text-3xl font-bold mb-4 text-gray-800">{title}</h2>
    {children}
  </div>
);

const CodeBlock = ({ children }) => (
  <pre className="bg-gray-200 p-4 rounded mt-2 border-l-4 border-green-500 font-mono text-sm">
    {children}
  </pre>
);

export default function ApiDocumentation() {
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="container">
      <div className="flex h-screen bg-gray-100">
        <Sidebar onSelect={setSelectedSection} />
        <div className="flex-1 p-8">
          <h1 className="text-5xl font-bold mb-6 text-gray-900">🚀 API для партнеров</h1>
          <Content section={selectedSection} />
        </div>
      </div>
    </div>
  );
}