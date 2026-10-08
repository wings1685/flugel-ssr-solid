import { useNavigate } from "@solidjs/router";
import { defaultFindValues } from "@/_global/lib/validate";
import type { FindSchema } from "@/_global/lib/validate";

export default function Find(props: FindSchema) {
	const navigate = useNavigate();

	const handleFind = (e: SubmitEvent & { currentTarget: HTMLFormElement; target: Element; }) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const query = {
			title: formData.get('title')?.toString() ?? defaultFindValues.title,
			sort: formData.get('sort')?.toString() ?? defaultFindValues.sort,
		} as FindSchema;
		const params = new URLSearchParams(query);
		navigate(`/?${params}`);
	};

	return (
		<div>
			<h1>Find</h1>
			<form id="find_form" onSubmit={ handleFind }>
				<fieldset>
					<input type="text" name="title" value={ props.title } />
					<label>
						<input type="radio" name="sort" value="asc" checked={ props.sort === 'asc' } />
						<span>ASC</span>
					</label>
					<label>
						<input type="radio" name="sort" value="desc" checked={ props.sort === 'desc' } />
						<span>DESC</span>
					</label>
					<button>Find</button>
				</fieldset>
			</form>
		</div>
	)
};
