import { createStore } from "solid-js";
import { defineStoreValues, storeNames } from "../../stores";
import type { ExperimentStoreKeys } from "../../stores";

const values = defineStoreValues(storeNames.piquo);
export const _piquoSignal = {
	server: {
		piquoSignal: () => values.initial(),
		setPiquoSignal: (_: ExperimentStoreKeys) => {},
	},
	client: () => {
		const [ piquoSignal, setSignal ] = createStore(values.initial());
		const setPiquoSignal = (key: ExperimentStoreKeys) => { setSignal(d => { d[key] = values.changed() }) };

		return { piquoSignal: () => piquoSignal, setPiquoSignal };
	},
};
