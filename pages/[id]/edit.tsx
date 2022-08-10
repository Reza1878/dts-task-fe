import BaseLayout from "component/BaseLayout";
import Container from "component/Container";
import PageTitle from "component/PageTitle";
import TaskForm from "component/TaskForm";
import { useRouter } from "next/router";
import React from "react";
import { toast } from "react-toastify";
import { getTask, getTasks, updateTask } from "service/task";
import { CreateTaskPayloadType, TaskType } from "service/types";

interface EditTaskProps {
  defaultValue: TaskType;
}

function EditTask({ defaultValue }: EditTaskProps) {
  const router = useRouter();
  const onSubmit = async (payload: CreateTaskPayloadType) => {
    const id = toast.loading("Please wait...");
    const settings = { isLoading: false, autoClose: 1000 };

    const response = await updateTask(defaultValue.id, payload);

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
          <TaskForm defaultValue={defaultValue} onSubmit={onSubmit} />
        </Container>
      </BaseLayout>
    </>
  );
}

export default EditTask;

export async function getStaticPaths() {
  const response = await getTasks();

  const paths = response.data.map((item: TaskType) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

interface GetStaticProps {
  params: {
    id: string;
  };
}

export async function getStaticProps({ params }: GetStaticProps) {
  const { id } = params;
  const response = await getTask(+id);

  return {
    props: {
      defaultValue: response.data,
    },
  };
}
