import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="not_found">
      <img src='/404.png' alt="Страница не найдена"></img>
      <div className='not_found_container'>
      <h1>Что-то пошло не так...</h1>
      <button onClick={() => navigate('/')}>Вернуться на главную</button></div>
    </div>
  );
};

export default NotFoundPage;
