import axios from "axios";
import { CreateTaskPayloadType } from "./types";

const ROOT_API = "https://go-dts-task.herokuapp.com/api/v1";

export async function getTasks() {
  const url = `${ROOT_API}/tasks`;

  const response = await axios.get(url).catch((err) => err);
  const { meta, data } = response.data;
  return { data, meta };
}

export async function createTask(payload: CreateTaskPayloadType) {
  const url = `${ROOT_API}/tasks`;

  const response = await axios.post(url, payload).catch((err) => err);
  const { meta, data } = response.data;
  return { data, meta };
}

export async function getTask(id: number) {
  const url = `${ROOT_API}/tasks/${id}`;

  const response = await axios.get(url);
  const { meta, data } = response.data;
  return { data, meta };
}

export async function updateTask(id: number, payload: CreateTaskPayloadType) {
  const url = `${ROOT_API}/tasks/${id}`;

  const response = await axios.put(url, payload);
  const { meta, data } = response.data;
  return { data, meta };
}

export async function deleteTask(id: number) {
  const url = `${ROOT_API}/tasks/${id}`;

  const response = await axios.delete(url);
  const { meta, data } = response.data;
  return { data, meta };
}
