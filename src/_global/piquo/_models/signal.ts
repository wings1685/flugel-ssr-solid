import { createStore } from "solid-js";
import { defineStoreValues, storeNames } from "../../stores";
import type { ExperimentStoreKeys } from "../../stores";

const values = defineStoreValues(storeNames.piquo);
export const _piquoSignal = {
	server: {
		piquoSignal: () => values.initial(),
		setPiqueSignal: (_: ExperimentStoreKeys) => {},
	},
	client: () => {
		const [ piquoSignal, setSignal ] = createStore(values.initial());
		const setPiqueSignal = (key: ExperimentStoreKeys) => { setSignal(d => { d[key] = values.changed() }) };

		return { piquoSignal: () => piquoSignal, setPiqueSignal };
	},
};
