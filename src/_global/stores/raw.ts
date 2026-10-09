import { createStore } from "solid-js";
import { defineStoreValues, storeNames } from ".";
import type { ExperimentStoreKeys } from ".";

const values = defineStoreValues(storeNames.raw);
export const [ rawSignal, setSignal ] = createStore(values.initial());
export const setRawSignal = (key: ExperimentStoreKeys) => { setSignal(d => { d[key] = values.changed() }) };
