import { _piquoSignal } from "./signal";

export const allStores = {
	piquoSignal: _piquoSignal,
} as const;
export type AllStores = typeof allStores;
export type AllStoreKeys = keyof AllStores;
