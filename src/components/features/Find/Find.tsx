import { useNavigate } from "@solidjs/router";
import type { FindSchema } from "@/_global/lib/validate";

export default function Find(props: FindSchema) {
	const navigate = useNavigate();

	const handleFind = (e: SubmitEvent & { currentTarget: HTMLFormElement; target: Element; }) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const query = {
			title: formData.get('title')?.toString() ?? '',
			sort: formData.get('sort')?.toString() ?? 'desc',
		};
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
