import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { CreateTaskPayloadType, TaskType } from "service/types";
import Button from "./Button";

interface TaskFormProps {
  onSubmit: (payload: CreateTaskPayloadType) => void;
  disabled?: boolean;
  defaultValue?: TaskType;
}

function TaskForm(props: TaskFormProps) {
  const { onSubmit, disabled, defaultValue } = props;
  const [task, setTask] = useState(defaultValue?.task ?? "");
  const [assignee, setAssignee] = useState(defaultValue?.assignee ?? "");
  const [dueDate, setDueDate] = useState(
    defaultValue?.due_date?.slice(0, 10) ?? ""
  );
  const router = useRouter();
  const handleSubmit = () => {
    if (!task || !assignee || !dueDate) {
      toast.error("All field is required");
      return;
    }
    onSubmit({ assignee, task, due_date: dueDate });
  };
  return (
    <>
      <div className="my-3">
        <label htmlFor="task" className="block">
          Task
        </label>
        <textarea
          id="task"
          rows={5}
          className="w-full border-2 rounded-md mt-2 py-2 px-4"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="my-3">
        <label htmlFor="assignee" className="block">
          Assignee
        </label>
        <input
          type="text"
          id="assignee"
          className="w-full border-2 rounded-md mt-2 py-2 px-4"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
      </div>
      <div className="my-3">
        <label htmlFor="due-date" className="block">
          Due Date
        </label>
        <input
          type="date"
          id="due-date"
          className="w-full border-2 rounded-md mt-2 py-2 px-4"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>

      <div className="flex">
        <Button disabled={disabled} onClick={handleSubmit} className="mr-2">
          Submit
        </Button>
        <Button
          disabled={disabled}
          onClick={() => router.push("/")}
          variant="danger"
        >
          Cancel
        </Button>
      </div>
    </>
  );
}

export default TaskForm;
