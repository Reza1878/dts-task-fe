import BaseLayout from "components/BaseLayout";
import Container from "components/Container";
import PageTitle from "components/PageTitle";
import TaskForm from "components/TaskForm";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { createTask } from "service/task";
import { CreateTaskPayloadType } from "service/types";

function CreateTask() {
  const router = useRouter();
  const onSubmit = async (payload: CreateTaskPayloadType) => {
    const id = toast.loading("Please wait...");
    const settings = { isLoading: false, autoClose: 1000 };

    const response = await createTask(payload);
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
    <BaseLayout title="Create Task">
      <Container>
        <PageTitle>Create Task</PageTitle>
        <TaskForm onSubmit={onSubmit} />
      </Container>
    </BaseLayout>
  );
}

export default CreateTask;
