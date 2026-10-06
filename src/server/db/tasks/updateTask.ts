import { eq } from "drizzle-orm";
import { db } from "../";
import { updateTaskSchema, validateSafeParse } from "@/_global/lib/validate";
import { task, taskDetail } from "../schema";
import type { TaskDetail } from "../types";
import type { UpdateTaskSchema } from "@/_global/lib/validate";
import type { DeepGuard } from "@/_global/lib/types.js";

export const updateTask = async (values?: DeepGuard<UpdateTaskSchema>) => {
	if (!values) throw new Error('Task Not Found.');

	const input = {
		...values,
		id: +(values.id ?? ''),
	};
	const result = validateSafeParse(updateTaskSchema, input);
	if (!result.success) throw new Error('Missing fields');

	const { id, title, text } = result.output;
	const taskData: Pick<UpdateTaskSchema, 'title'> = { title };

	await db.transaction(async (tx) => {
		await tx.update(task).set(taskData).where(eq(task.id, id));

		const detail = await tx.query.taskDetail.findFirst({
			where: eq(taskDetail.task_id, id),
		});
		if (!detail) throw new Error('TaskDetail Not Found.');

		const taskDetailData: Omit<TaskDetail, 'id'> = {
			task_id: id,
			text: text,
		};

		await tx.update(taskDetail).set(taskDetailData).where(eq(taskDetail.id, detail.id));
	});

	return { success: true };
};
