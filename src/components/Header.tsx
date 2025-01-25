import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

interface HeaderProps {
  onFilterChange: (sortBy: 'date' | 'views', sortOrder: 'asc' | 'desc', keyword: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onFilterChange }) => {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortBy, setSortBy] = useState<'date' | 'views'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterKeyword, setFilterKeyword] = useState('');
  const navigate = useNavigate(); 

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const applyFilters = () => {
    onFilterChange(sortBy, sortOrder, filterKeyword); 
    navigate('/'); 
  };

  return (
    <header className="header">
      <div className="header_container"> 
        <img className="logo" src="/logo.svg" alt="Logo" /> 
        <input
          className="search_bar"
          type="text"
          placeholder="Искать"
          value={filterKeyword}
          onChange={(e) => setFilterKeyword(e.target.value)}
        />
        <button className="search_btn" onClick={applyFilters}>
          Искать
        </button>
        <button className="filter" onClick={toggleFilter}></button>
      </div>
      <div>
        {isFilterVisible && (
          <div className="filter_container">
            <div className="filter_section">
              <p>Сортировать:</p>
              <button className='filter_btn'
                id={sortBy === 'date' ? 'active' : ''}
                onClick={() => setSortBy('date')}>
                Дате
              </button>
              <button className='filter_btn'
                id={sortBy === 'views' ? 'active' : ''}
                onClick={() => setSortBy('views')}>
                Просмотрам
              </button>
            </div>
            <div className="filter_section">
              <p>Направление сортировки:</p>
              <button className='filter_btn'
                id={sortOrder === 'asc' ? 'active' : ''}
                onClick={() => setSortOrder('asc')}>
                Возрастанию
              </button>
              <button className='filter_btn'
                id={sortOrder === 'desc' ? 'active' : ''}
                onClick={() => setSortOrder('desc')}>
                Убыванию
              </button>
            </div>
            <button id="apply_btn" onClick={applyFilters}>
              Применить
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
