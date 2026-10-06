import { createEffect, createSignal } from "solid-js";
import { defaultFindValues } from "@/_global/lib/validate";
import { useLocation, useNavigate } from "@solidjs/router";
import type { FindSchema } from "@/_global/lib/validate";

type HandleInputEvent = InputEvent & {
	currentTarget: HTMLInputElement;
	target: HTMLInputElement;
};

export default function Find() {
	const loc = useLocation();
	const navigate = useNavigate();
	const [ findData, setFindData ] = createSignal(defaultFindValues);

	createEffect(
		() => loc.search,
		search => {
			const params = new URLSearchParams(search);
			setFindData({
				title: params.get('title') ?? defaultFindValues.title ?? '',
				sort: (params.get('sort') ?? defaultFindValues.sort) as FindSchema['sort'],
			})
		},
	);

	const handleFind = (e: SubmitEvent) => {
		e.preventDefault();

		const params = new URLSearchParams(findData());
		navigate(`/?${params}`);
	};

	const handleInput = (e: HandleInputEvent) => {
		const input = { ...findData() };
		if (e.currentTarget.name === 'title') {
			input.title = e.currentTarget.value;
		} else {
			input.sort = e.currentTarget.value as FindSchema['sort'];
		}
		setFindData(input);
	};

	return (
		<div>
			<h1>Find</h1>
			<form id="find_form" onSubmit={ handleFind }>
				<fieldset>
					<input type="text" name="title" value={ findData().title } onInput={ handleInput } />
					<label>
						<input type="radio" name="sort" value="asc" checked={ findData().sort === 'asc' } onInput={ handleInput } />
						<span>ASC</span>
					</label>
					<label>
						<input type="radio" name="sort" value="desc" checked={ findData().sort === 'desc' } onInput={ handleInput } />
						<span>DESC</span>
					</label>
					<button>Find</button>
				</fieldset>
			</form>
		</div>
	)
};
