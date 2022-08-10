import BaseLayout from "component/BaseLayout";
import Button from "component/Button";
import Container from "component/Container";
import PageTitle from "component/PageTitle";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { deleteTask, getTasks } from "service/task";
import { TaskType } from "service/types";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

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

        <table className="w-full border mt-4">
          <thead>
            <tr className="border-b-2">
              <th className="p-2">No</th>
              <th className="p-2">Task</th>
              <th className="p-2">Assignee</th>
              <th className="p-2">Due Date</th>
              <th className="p-2">Action</th>
            </tr>
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
            {!loading &&
              tasks.map((item: TaskType, index: number) => (
                <tr key={item.id}>
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{item.task}</td>
                  <td className="p-2">{item.assignee}</td>
                  <td className="p-2">{item.due_date.slice(0, 10)}</td>
                  <td className="p-2">
                    <Button
                      onClick={() => router.push(`/${item.id}/edit`)}
                      className="py-1 px-4 mr-2"
                      variant="secondary"
                    >
                      <i className="fas fa-edit"></i>
                    </Button>
                    <Button
                      onClick={() => onDelete(item.id)}
                      className="py-1 px-4"
                      variant="danger"
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Container>
    </BaseLayout>
  );
};

export default Home;
