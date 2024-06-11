import React, { useState, useMemo } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import './DataTable.css';


const DataTableTest = ({ columns, data, onView, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [searchFilters, setSearchFilters] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [editedCell, setEditedCell] = useState({ rowIndex: null, columnId: null });

  const handleSearchChange = (e, columnId) => {
    const value = e.target.value;
    setSearchFilters(prevFilters => ({
      ...prevFilters,
      [columnId]: value,
    }));
  };

  const handleSort = (columnId) => {
    let direction = 'asc';
    if (sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnId, direction });
  };

  const sortedData = useMemo(() => {
    let sortableData = [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);

  const filteredData = useMemo(() => {
    return sortedData.filter(row => {
      return Object.keys(searchFilters).every(key => {
        return String(row[key]).toLowerCase().includes(searchFilters[key].toLowerCase());
      });
    });
  }, [sortedData, searchFilters]);

  const paginatedData = useMemo(() => {
    const start = currentPage * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage, pageSize]);

  const handlePageChange = (direction) => {
    setCurrentPage(prevPage => {
      if (direction === 'next') {
        return Math.min(prevPage + 1, Math.ceil(filteredData.length / pageSize) - 1);
      } else if (direction === 'prev') {
        return Math.max(prevPage - 1, 0);
      }
      return prevPage;
    });
  };

  const handleCellEdit = (rowIndex, columnId, value) => {
    data[rowIndex][columnId] = value;
    setEditedCell({ rowIndex: null, columnId: null });
  };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            {columns.map(column => (
              <th key={column.id}>
                <div onClick={() => handleSort(column.id)}>
                  {column.Header} {sortConfig.key === column.id ? (sortConfig.direction === 'asc' ? '🔼' : '🔽') : ''}
                </div>
                <input
                  type="text"
                  className='searchInputField'
                  placeholder={`Search ${column.Header}`}
                  value={searchFilters[column.id] || ''}
                  onChange={(e) => handleSearchChange(e, column.id)}
                />
              </th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(column => (
                <td
                  key={column.id}
                  onClick={() => setEditedCell({ rowIndex, columnId: column.id })}
                >
                  {editedCell.rowIndex === rowIndex && editedCell.columnId === column.id ? (
                    <input
                      type="text"
                      value={row[column.id]}
                      onChange={(e) => handleCellEdit(rowIndex, column.id, e.target.value)}
                    />
                  ) : (
                    row[column.id]
                  )}
                </td>
              ))}
              <td className='displayButtonClass'>
                <button onClick={() => onView(row)}>
                  <FaEye />
                </button>
                <button onClick={() => onEdit(row)}>
                  <FaEdit />
                </button>
                <button onClick={() => onDelete(row)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => handlePageChange('prev')} disabled={currentPage === 0}>
          {'<'}
        </button>
        <span style={{display: 'flex',
    alignItems: 'center'}}>Page {currentPage + 1}</span>
        <button onClick={() => handlePageChange('next')} disabled={currentPage >= Math.ceil(filteredData.length / pageSize) - 1}>
          {'>'}
        </button>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {[10, 20, 30, 40, 50].map(size => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
export default DataTableTest;

