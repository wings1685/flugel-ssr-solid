export const storeNames = {
	raw: 'Raw Signal',
	piquo: 'Piquo Signal',
	rawNano: 'Raw Nano',
	piquoNano: 'Piquo Nano',
} as const;
export type StoreName = keyof typeof storeNames;

const initialText = 'Default ✅️';
type InitialText = typeof initialText;
const changedText = 'Changed 💣️';
type ChangedText = typeof changedText;

type InitialValue<T extends string> = `${T} ${InitialText}`;
type ChangedValue<T extends string> = `${T} ${ChangedText}`;
type StoreValues<T extends string> = InitialValue<T> | ChangedValue<T>;
type ExperimentStore<T extends string> = {
	forServer: StoreValues<T>;
	forClient: StoreValues<T>;
};
export type ExperimentStoreKeys = keyof ExperimentStore<string>;

const getInitialValues = <T extends string>(name: T): ExperimentStore<T> => ({
	forServer: `${name} ${initialText}`,
	forClient: `${name} ${initialText}`,
});
const getChangedText = <T extends string>(name: T): ChangedValue<T> => `${name} ${changedText}`;
export const defineStoreValues = <T extends string>(name: T) => ({
	initial: (): ExperimentStore<T> => getInitialValues(name),
	changed: (): ChangedValue<T> => getChangedText(name),
});
