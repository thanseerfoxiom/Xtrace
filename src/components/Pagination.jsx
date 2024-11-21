

import React from "react";

function Pagination({ table }) {
  if (!table) {
    return null; // Or display a message like "Loading..."
  }
  return (
    <nav className="dm-page mb-2 px-2 pb-2" style={{ float: "right" }}>
      <ul className="dm-pagination d-flex">
        <li className="dm-pagination__item">
          <button 
            onClick={() => table.setPageIndex(0)} 
            disabled={!table.getCanPreviousPage()} 
            className="dm-pagination__link pagination-control"
          >
            <span className="la la-angle-left" />
          </button>
          {table.getPageOptions().map((page, index) => (
            <a 
              key={index} 
              href="#" 
              className={`dm-pagination__link  ${table.getState().pagination.pageIndex === index ?  'active' : ''}`}
              hidden={Math.abs(table.getState().pagination.pageIndex - index) > 1 }
              onClick={(e) => {
                e.preventDefault();
                table.setPageIndex(index);
              }}
            >
              <span className="page-number">{page + 1} </span>
            </a>
          ))}
          <button 
  onClick={() => table.setPageIndex(table.getPageCount() - 1)} 
  disabled={!table.getCanNextPage()} 
  className="dm-pagination__link pagination-control"
>
  <span className="la la-angle-right" />
</button>
        </li>
        <li className="dm-pagination__item">
          <div className="paging-option">
            <select 
              name="page-number" 
              className="page-selection"
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
            >
              {[10, 40, 60].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}/page
                </option>
              ))}
            </select>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
