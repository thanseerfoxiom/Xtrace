import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import Pagination from './Pagination';

export default function Table({data, columns, pagination, onPageChange, onPageSizeChange}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pagination.totalPages,
    state: {
      pagination: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize
      }
    },
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' 
        ? updater({ pageIndex: pagination.pageIndex, pageSize: pagination.pageSize }) 
        : updater;
      
      if (newPagination.pageSize !== pagination.pageSize) {
        onPageSizeChange(newPagination.pageSize);
      } else {
        onPageChange(newPagination.pageIndex);
      }
    },
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (<>
    <div className=" mt-1 p-2 table-responsive">
    <table className="table table--default body-px-25">
                            
                              <thead>
                                {table?.getHeaderGroups()?.map(headerGroup => (
                                  <tr key={headerGroup?.id}>
                                    {headerGroup?.headers?.map(header => (
                                     <th 
                                     key={header?.id} 
                                     className="pt-6 pb-[27px] px-[22px] bg-tableheader border border-inputborder text-left text-buttontextcolor whitespace-nowrap">
                                     <h5>{header ? flexRender(header?.column?.columnDef?.header, header?.getContext()) : null}</h5>
                                   </th>
                                    ))}
                                  </tr>
                                ))}
                              </thead>
                              <tbody>
                              {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className='hover:bg-gray-100'>
                {row.getVisibleCells().map((cell,index) => {
                  const columnSize = cell.column.columnDef.size || 'auto';
                  const isTruncated = cell.column.columnDef.isTruncated || false;
                  return (
                    <td
                      key={cell?.id}
                      className={`px-[20px] pt-[23px] pb-[24px] border-b truncate  text-sm font-medium  ${
                        index === row?.getVisibleCells()?.length - 1 ? '' : 'border-r'
                      } ${isTruncated ? 'truncate' : ''}`}

                      style={{
                        width: columnSize !== 'auto' ? `${columnSize}px` : 'auto',
                        maxWidth: columnSize !== 'auto' ? `${columnSize}px` : 'none',
                      }}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns?.length} className="py-3 text-center text-gray-500">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
                        </div>
                        <Pagination
        table={table}
        totalItems={pagination?.totalItems??0}
        totalPages={pagination?.totalPages??0}
        hasNext={pagination?.hasNext}
        hasPrevious={pagination?.hasPrevious}
        currentPage={pagination?.pageIndex + 1}
      />
                           
                            </>
  )
}
