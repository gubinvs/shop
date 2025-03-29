// UserInfo.jsx
import React from 'react';

const UserInfo = ({ userInfo, personInfo }) => {
  return (
    <div className="user-info">
      {Array.isArray(userInfo) ? (
        userInfo.map((com) => (
          <p key={com.id || com.nameCompany}>
            <strong>Компания:</strong> {com.nameCompany || "Нет данных о компании"}
          </p>
        ))
      ) : (
        <p>
          <strong>Компания:</strong>{" "}
          {userInfo?.nameCompany || "Нет данных о компании"}
        </p>
      )}
      <p>
        <strong>Пользователь:</strong>{" "}
        {personInfo?.nameUser || "Нет данных о пользователе"}
      </p>
    </div>
  );
};

export default UserInfo;
