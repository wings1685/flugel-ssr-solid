import { createMemo } from "solid-js";
import { query, useLocation } from "@solidjs/router";
import { Form, Find, List } from "@/components/features";
import { buildFindQuery, fetchTasks } from "@/server/db/tasks/fetchTasks";
import type { RouteDefinition } from "@solidjs/router";

const getTasks = query(async (search?: string) => {
	"use server";

	const findQuery = buildFindQuery(search ?? '');
	const tasks = await fetchTasks(findQuery ?? {});

	return { tasks, findQuery };
}, 'get-tasks');

export const route = {
	preload: () => void getTasks(),
} satisfies RouteDefinition;

export default function Page() {
	const loc = useLocation();
	const data = createMemo(() => getTasks(loc.search));

	return (
		<main>
			<Form />
			<Find { ...data().findQuery } />
			<List tasks={ data().tasks } />
		</main>
	)
};
