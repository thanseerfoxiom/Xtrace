

// import React from "react";

// function Pagination({ table }) {
//   if (!table) {
//     return null; // Or display a message like "Loading..."
//   }
//   return (
//     <nav className="dm-page mb-2 px-2 pb-2" style={{ float: "right" }}>
//       <ul className="dm-pagination d-flex">
//         <li className="dm-pagination__item">
//           <button 
//             onClick={() => table.setpage(0)} 
//             disabled={!table.getCanPreviousPage()} 
//             className="dm-pagination__link pagination-control"
//           >
//             <span className="la la-angle-left" />
//           </button>
//           {table.getPageOptions().map((page, index) => (
//             <a 
//               key={index} 
//               href="#" 
//               className={`dm-pagination__link  ${table.getState().pagination.page === index ?  'active' : ''}`}
//               hidden={Math.abs(table.getState().pagination.page - index) > 1 }
//               onClick={(e) => {
//                 e.preventDefault();
//                 table.setpage(index);
//               }}
//             >
//               <span className="page-number">{page + 1} </span>
//             </a>
//           ))}
//           <button 
//   onClick={() => table.setpage(table.getPageCount() - 1)} 
//   disabled={!table.getCanNextPage()} 
//   className="dm-pagination__link pagination-control"
// >
//   <span className="la la-angle-right" />
// </button>
//         </li>
//         <li className="dm-pagination__item">
//           <div className="paging-option">
//             <select 
//               name="page-number" 
//               className="page-selection"
//               value={table.getState().pagination.pageSize}
//               onChange={(e) => table.setPageSize(Number(e.target.value))}
//             >
//               {[10, 40, 60].map(pageSize => (
//                 <option key={pageSize} value={pageSize}>
//                   {pageSize}/page
//                 </option>
//               ))}
//             </select>
//           </div>
//         </li>
//       </ul>
//     </nav>
//   );
// }

// export default Pagination;

import React from "react";

function Pagination({ pagination, setPagination }) {
  const { page, limit, totalPages, hasNext, hasPrevious } = pagination;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage <= totalPages) {
      setPagination(prev => ({
        ...prev,
        page: newPage,
      }));
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPagination(prev => ({
      ...prev,
      limit: newSize,
      page: 1, // Reset to first page
    }));
  };

  return (
    <nav className="dm-page mb-2 px-2 pb-2" style={{ float: "right" }}>
      <ul className="dm-pagination d-flex align-items-center">
        <li className="dm-pagination__item">
          <button 
            onClick={() => handlePageChange(0)} 
            disabled={!hasPrevious}
            className="dm-pagination__link pagination-control me-2"
          >
            <span className="la la-angle-double-left" />
            
          </button>
          <button 
            onClick={() => handlePageChange(page - 1)} 
            disabled={!hasPrevious}
            className="dm-pagination__link pagination-control "
          >
            <span className="la la-angle-left" />
            
          </button>
        </li>

        {/* Page Numbers */}
        <li className="dm-pagination__item">
          <span className="">
            Page {page } of {totalPages}
          </span>
        </li>

        <li className="dm-pagination__item">
          <button 
            onClick={() => handlePageChange(page + 1)} 
            disabled={!hasNext}
            className="dm-pagination__link pagination-control "
          >
            
            <span className="la la-angle-right" />
          </button>
          <button 
            onClick={() => handlePageChange(totalPages )} 
            disabled={!hasNext}
            className="dm-pagination__link pagination-control"
          >
            
            <span className="la la-angle-double-right" />
          </button>
        </li>

        {/* Page Size Selector */}
        <li className="dm-pagination__item ">
          <div className="paging-option">
            <select 
              name="page-size" 
              className="page-selection form-select"
              value={limit}
              onChange={handlePageSizeChange}
            >
              {[10, 20, 30, 40, 50].map(size => (
                <option key={size} value={size}>
                  {size}/page
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
