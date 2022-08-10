import BaseLayout from "components/BaseLayout";
import Button from "components/Button";
import Container from "components/Container";
import PageTitle from "components/PageTitle";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "service/task";
import { TaskType } from "service/types";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import TableCellSearch from "components/TableCellSearch";

const Home: NextPage = () => {
  const [tasks, setTask] = useState([]);
  const [refetch, setReftch] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let active = true;
    const fetchTask = async () => {
      setLoading(true);
      const response = await getTasks();

      if (!active) return;

      setTask(response!.data);
      setLoading(false);
    };

    fetchTask();

    return () => {
      active = false;
    };
  }, [refetch]);

  const columnHelper = createColumnHelper<TaskType>();

  const columns = [
    columnHelper.accessor("task", {
      cell: (info) => info.getValue(),
      header: () => <span>Task</span>,
    }),
    columnHelper.accessor("assignee", {
      cell: (info) => info.getValue(),
      header: () => <span>Assignee</span>,
    }),
    columnHelper.accessor("due_date", {
      cell: (info) => info.getValue().slice(0, 10),
      header: () => <span>Due Date</span>,
    }),
    columnHelper.accessor("id", {
      cell: (info) => (
        <>
          <Button
            onClick={() => router.push(`/${info.getValue()}/edit`)}
            className="py-1 px-4 mr-2"
            variant="secondary"
          >
            <i className="fas fa-edit"></i>
          </Button>
          <Button
            onClick={() => onDelete(info.getValue())}
            className="py-1 px-4"
            variant="danger"
          >
            <i className="fas fa-trash"></i>
          </Button>
        </>
      ),
      header: "Action",
      enableColumnFilter: false,
    }),
  ];

  const table = useReactTable({
    data: tasks,
    getCoreRowModel: getCoreRowModel(),
    columns: columns,
    getFilteredRowModel: getFilteredRowModel(),
  });

  const filteredRowCount = table.getFilteredRowModel().rows.length;
  console.log(filteredRowCount);

  const confirmDelete = async (id: number) => {
    const toastId = toast.loading("Please wait...");
    const settings = { isLoading: false, autoClose: 1000 };

    const response = await deleteTask(id);

    const { meta } = response;

    if (meta.code === 200) {
      toast.update(toastId, {
        ...settings,
        type: "success",
        render: meta.message,
        onClose: () => setReftch(!refetch),
      });
    } else {
      toast.update(toastId, {
        ...settings,
        type: "error",
        render: meta.message,
      });
    }
  };

  const onDelete = (id: number) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure? you wont able to revert this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => confirmDelete(id),
        },
        {
          label: "No",
          onClick: () => console.log("No"),
        },
      ],
    });
  };
  return (
    <BaseLayout title="Task">
      <Container>
        <div className="flex flex-wrap justify-between">
          <PageTitle>List Task</PageTitle>
          <Button onClick={() => router.push("/create")}>Create</Button>
        </div>

        <div className="overflow-x-auto">
          <table className="mt-4 border w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr className="border-b-2" key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th className="p-2" key={header.id}>
                      <div className="flex flex-wrap text-center">
                        {header.isPlaceholder ? null : (
                          <p className="text-center w-full">
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </p>
                        )}
                        {header.column.getCanFilter() && (
                          <TableCellSearch
                            column={header.column}
                            table={table}
                          />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} className="text-center">
                    Loading...
                  </td>
                </tr>
              )}
              {!loading && tasks.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No data available
                  </td>
                </tr>
              )}
              {!loading && filteredRowCount === 0 && (
                <tr>
                  <td colSpan={5} className="text-center">
                    No data available
                  </td>
                </tr>
              )}
              {!loading &&
                table.getRowModel().rows.map((row) => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <td className="p-2" key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Container>
    </BaseLayout>
  );
};

export default Home;
