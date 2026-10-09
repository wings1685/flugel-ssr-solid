import { createMemo } from "solid-js";
import { query, useLocation } from "@solidjs/router";
import { Form, Find, List } from "@/components/features";
import { buildFindQuery, fetchTasks } from "@/server/db/tasks/fetchTasks";

const getTasks = query(async (search: string) => {
	"use server";

	const findQuery = buildFindQuery(search);
	const tasks = await fetchTasks(findQuery);

	return { tasks, findQuery };
}, 'get-tasks');

export default function Page() {
	const loc = useLocation();
	const data = createMemo(() => getTasks(loc.search));

	return (
		<>
			<Form />
			<Find { ...data().findQuery } />
			<List tasks={ data().tasks } />
		</>
	)
};
