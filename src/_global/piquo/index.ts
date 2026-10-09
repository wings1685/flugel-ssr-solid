import { allStores } from "./_models";
import type { AllStoreKeys, AllStores } from "./_models";

const createServerStore = (key: AllStoreKeys): AllStores[typeof key]['server'] => allStores[key].server;

type CreateClientStore = ReturnType<AllStores[AllStoreKeys]['client']>;
const createClientStore = (key: AllStoreKeys): CreateClientStore => allStores[key].client();

type ClientStoreInstance = Record<AllStoreKeys, CreateClientStore | null>;
const clientStoreInstance = Object.fromEntries(Object.keys(allStores).map(key => ([ key, null ]))) as ClientStoreInstance;

export const piquoStore = <K extends AllStoreKeys, R extends ReturnType<AllStores[K]['client']>>(key: K) => {
	if (import.meta.env.SSR) return createServerStore(key) as R;

	if (!clientStoreInstance[key]) {
		clientStoreInstance[key] = createClientStore(key);
	}

	return clientStoreInstance[key] as R;
};
