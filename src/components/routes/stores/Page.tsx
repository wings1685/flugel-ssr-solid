import { createMemo } from "solid-js";
import { rawSignal, setRawSignal } from "@/_global/stores/raw";
import { piquoStore } from "@/_global/piquo";
import { loadFromServer } from "./_models/load.server";
import { handleServerStore } from "./_models/update.server";

export default function Page() {
	const { piquoSignal, setPiquoSignal } = piquoStore('piquoSignal');

	const data = createMemo(async () => await loadFromServer());

	return (
		<div>
			<h1>Raw Signal</h1>
			<fieldset>
				<span>forServer: { data().rawSignalServer }</span>
				<button onClick={ () => handleServerStore('raw') }>Click</button>
			</fieldset>
			<fieldset>
				<span>forClient: { rawSignal.forClient }</span>
				<button onClick={ () => setRawSignal('forClient') }>Click</button>
			</fieldset>
			<h1>Piquo Signal</h1>
			<fieldset>
				<span>forServer: { data().piquoSignalServer }</span>
				<button onClick={ () => handleServerStore('piquo') }>Click</button>
			</fieldset>
			<fieldset>
				<span>forClient: { piquoSignal().forClient }</span>
				<button onClick={ () => setPiquoSignal('forClient') }>Click</button>
			</fieldset>
		</div>
	)
};
