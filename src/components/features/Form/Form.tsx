import { createSignal } from "solid-js";
import { revalidate } from "@solidjs/router";
import { createTask } from "@/server/db/tasks/createTask";
import { defaultCreateTaskValues } from "@/_global/lib/validate";
import type { CreateTaskSchema } from "@/_global/lib/validate";

const createData = async (newData: CreateTaskSchema) => {
	"use server";

	return await createTask(newData);
};

export default function Form() {
	const defaultCreateValues = structuredClone({ ...defaultCreateTaskValues });
	const [ newData, setNewData ] = createSignal<CreateTaskSchema>(defaultCreateValues);

	const handleCreate = async (e: Event) => {
		e.preventDefault();

		await createData(newData());

		setNewData(defaultCreateValues);
		revalidate();
	};

	return (
		<div>
			<h1>Input</h1>
			<form onSubmit={ handleCreate }>
				<fieldset>
					<input type="text" name="title" value={ newData().title } onInput={ e => newData().title = e.currentTarget.value } placeholder="title..." />
				</fieldset>
				<fieldset>
					<input type="text" name="text" value={ newData().text } onInput={ e => newData().text = e.currentTarget.value } placeholder="text..." />
				</fieldset>
				<fieldset>
					<button>Add</button>
				</fieldset>
			</form>
		</div>
	)
};
