import React from 'react';
import '../styles/style.css';

interface PaginationProps {
  totalItems: number; 
  currentPage: number; 
  itemsPerPage: number; 
  onPageChange: (pageNumber: number) => void; // Коллбэк для смены страницы
  onItemsPerPageChange: (itemsPerPage: number) => void; // Коллбэк для смены количества элементов на странице
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  currentPage,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage); // Расчет общего количества страниц

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      onPageChange(pageNumber); // Вызываем коллбэк для обновления текущей страницы
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newItemsPerPage = parseInt(e.target.value, 10);
    onItemsPerPageChange(newItemsPerPage); // Вызываем коллбэк для обновления количества элементов на странице
    onPageChange(1); 
  };

  if (totalPages === 0) {
    return null; 
  }

  return (
    <div className="pagination">
      <div className="items_per_page">
        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="32">32</option>
          <option value="56">56</option>
        </select>
      </div>
      <div className="page_controls">
        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={index}
              className={currentPage === pageNumber ? 'active' : ''}
              onClick={() => handlePageChange(pageNumber)}>
              {pageNumber}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Pagination;
