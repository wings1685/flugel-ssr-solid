import { createMemo } from "solid-js";
import { query, useLocation } from "@solidjs/router";
import { Form, Find, List } from "@/components/features";
import { fetchTasks } from "@/server/db/tasks/fetchTasks";
import { buildFindQuery } from "@/server/db/tasks/fetchTasks";
import type { RouteDefinition } from "@solidjs/router";

const getTasks = query(async (search?: string) => {
	"use server";

	const findQuery = buildFindQuery(search ?? '');
	const tasks = await fetchTasks(findQuery);

	return tasks;
}, 'get-tasks');

export const route = {
	preload: () => void getTasks(),
} satisfies RouteDefinition;

export default function Page() {
	const loc = useLocation();
	const tasks = createMemo(() => getTasks(loc.search));

	return (
		<main>
			<Form />
			<Find />
			<List tasks={ tasks() } />
		</main>
	)
};
