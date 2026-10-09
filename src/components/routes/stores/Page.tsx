import { createMemo, Show } from "solid-js";
import { rawSignal, setRawSignal } from "@/_global/stores/raw";
import { piquoStore } from "@/_global/piquo";
import { loadFromServer } from "./_models/load.server";
import { handleServerStore } from "./_models/update.server";

export default function Page() {
	const { piquoSignal, setPiqueSignal } = piquoStore('piquoSignal');

	const data = createMemo(async () => await loadFromServer());

	return (
		<div>
			<h1>Raw Store</h1>
			<fieldset>
				<span>forServer: { data().rawRunesServer }</span>
				<button onClick={ () => handleServerStore('raw') }>Click</button>
			</fieldset>
			<fieldset>
				<span>forClient: { rawSignal.forClient }</span>
				<button onClick={ () => setRawSignal('forClient') }>Click</button>
			</fieldset>
			<h1>Piquo Store</h1>
			<fieldset>
				<span>forServer: { data().piquoRunesServer }</span>
				<button onClick={ () => handleServerStore('piquo') }>Click</button>
			</fieldset>
			<fieldset>
				<span>forClient: { piquoSignal().forClient }</span>
				<button onClick={ () => setPiqueSignal('forClient') }>Click</button>
			</fieldset>
		</div>
	)
};
