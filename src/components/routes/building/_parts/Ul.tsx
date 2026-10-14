import { For, onSettled } from "solid-js"
import { buildingData, buildPerformance } from "../_models/performance";
import type { LiPatternsProps } from "../_models/performance";

export default function Ul(props: LiPatternsProps) {
	const data = buildingData(props.number);

	onSettled(() => {
		buildPerformance();
	});

	return (
		<ul>
			<For each={ data } keyed={ false }>
				{item => (
					<li>{ item() }</li>
				)}
			</For>
		</ul>
	)
}
