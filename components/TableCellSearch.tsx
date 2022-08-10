import { Column, Table as ReactTable } from "@tanstack/react-table";
import React from "react";

function TableCellSearch({
  column,
  table,
}: {
  column: Column<any, any>;
  table: ReactTable<any>;
}) {
  const columnFilterValue = column.getFilterValue();

  return (
    <input
      type="text"
      value={(columnFilterValue ?? "") as string}
      onChange={(e) => column.setFilterValue(e.target.value)}
      placeholder={"Search..."}
      className="border rounded w-full p-2"
    />
  );
}

export default TableCellSearch;
