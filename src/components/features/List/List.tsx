import { createEffect, createSignal, For } from "solid-js";
import { revalidate } from "@solidjs/router";
import { updateTask } from "@/server/db/tasks/updateTask";
import { deleteTask } from "@/server/db/tasks/deleteTask";
import type { TaskSchema } from "@/_global/lib/validate";

type DataId = TaskSchema['id'];

const editData = async (data?: TaskSchema) => {
	"use server";

	await updateTask(data);
};

const deleteData = async (id: DataId) => {
	"use server";

	await deleteTask({ id });
};

export type Props = {
	tasks: TaskSchema[];
};

export default function List(props: Props) {
	const [ taskItems, setTaskItem ] = createSignal<TaskSchema[]>([]);

	createEffect(
		() => ({ tasks: props.tasks }),
		data => {
			setTaskItem(data.tasks);
		},
	);

	const handleEdit = async (id: DataId) => {
		const data = taskItems().find(d => d.id === id);
		await editData(data);

		revalidate();
	};

	const handleDelete = async (id: DataId) => {
		await deleteData(id);

		revalidate();
	};

	return (
		<div>
			<h1>List</h1>
			<ul>
				<For each={ taskItems() } keyed={ false }>
					{(task, index) => (
						<li>
							<input type="text" value={ task().title } onInput={ e => setTaskItem(prev => prev.map((t, i) => i === index ? { ...t, title: e.currentTarget.value } : t)) } />
							<input type="text" value={ task().text } onInput={ e => setTaskItem(prev => prev.map((t, i) => i === index ? { ...t, text: e.currentTarget.value } : t)) } />
							<button type="button" onClick={ () => handleEdit(task().id) }>Edit</button>
							<button type="button" onClick={ () => handleDelete(task().id) }>Delete</button>
						</li>
					)}
				</For>
			</ul>
		</div>
	)
};
