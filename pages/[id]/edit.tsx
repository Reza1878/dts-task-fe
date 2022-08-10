import BaseLayout from "components/BaseLayout";
import Button from "components/Button";
import Container from "components/Container";
import PageTitle from "components/PageTitle";
import TaskForm from "components/TaskForm";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTask, updateTask } from "service/task";
import { CreateTaskPayloadType, TaskType } from "service/types";

function EditTask() {
  const [defaultValue, setDefaultValue] = useState<TaskType>();
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    let active = true;

    const fetchData = async () => {
      setLoading(true);
      const { id } = router.query;
      const toastId = toast.loading("Fetching data...");
      const settings = { isLoading: false, autoClose: 1000 };
      try {
        const response = await getTask(+id! ?? 0);
        const { data, meta } = response;

        if (!active) return;

        if (meta.code === 200) {
          const task: TaskType = {
            assignee: data.assignee,
            task: data.task,
            due_date: data.due_date,
            id: data.id,
          };
          setDefaultValue(task);
          toast.update(toastId, {
            ...settings,
            type: "success",
            render: meta.message,
          });
        }
      } catch (error: any) {
        const { meta } = error?.response?.data;
        toast.update(toastId, {
          ...settings,
          type: "error",
          render: meta.message,
        });
      }
      setLoading(false);
    };
    if (router.isReady) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);
  const onSubmit = async (payload: CreateTaskPayloadType) => {
    const id = toast.loading("Please wait...");
    const settings = { isLoading: false, autoClose: 1000 };

    const response = await updateTask(defaultValue!.id, payload);

    const { meta } = response;
    if (meta.code === 200) {
      toast.update(id, {
        ...settings,
        type: "success",
        render: meta.message,
        onClose: () => router.push("/"),
      });
    } else {
      toast.update(id, { ...settings, type: "error", render: meta.message });
    }
  };
  return (
    <>
      <BaseLayout title="Edit Task">
        <Container>
          <PageTitle>Edit Task</PageTitle>
          {!loading && defaultValue && (
            <TaskForm defaultValue={defaultValue} onSubmit={onSubmit} />
          )}

          {!loading && !defaultValue && (
            <div className="text-center">
              <h1 className="font-medium text-2xl">Oops! Data not found</h1>
              <p>Task that you are looking for is not available</p>
              <Button onClick={() => router.push("/")} className="my-2">
                Back to home
              </Button>
            </div>
          )}
        </Container>
      </BaseLayout>
    </>
  );
}

export default EditTask;
