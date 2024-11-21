import React from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import Pagination from './Pagination';

export default function Table({data,columns,pagination,setPagination}) {
  const table = useReactTable({
    data: data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state:{pagination},
    onPaginationChange:setPagination,
    pageCount:Math.ceil(data?.length/pagination.pageSize)
  });
  return (<>
    <div className="userDatatable mt-1 p-2 table-responsive">
    <table className="table table--default body-px-25">
                            
                              <thead>
                                {table?.getHeaderGroups()?.map(headerGroup => (
                                  <tr key={headerGroup?.id}>
                                    {headerGroup?.headers?.map(header => (
                                      <th key={header.id}>
                                        {flexRender(header?.column?.columnDef?.header, header?.getContext())}
                                      </th>
                                    ))}
                                  </tr>
                                ))}
                              </thead>
                              <tbody>
                              {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const columnSize = cell.column.columnDef.size || 'auto';
                  const isTruncated = cell.column.columnDef.isTruncated || false;
                  return (
                    <td
                      key={cell.id}
                      className={`px-4 border border-gray-200 text-gray-700 text-sm ${
                        isTruncated ? 'truncate' : ''
                      }`}
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
              <td colSpan={columns.length} className="py-3 text-center text-gray-500">
                No Data
              </td>
            </tr>
          )}
        </tbody>
      </table>
                        </div>
                            <Pagination table={table}   />
                            </>
  )
}
