"use server";

import { setRawSignal } from "@/_global/stores/raw";
import { piquoStore } from "@/_global/piquo";
import type { StoreName } from "@/_global/stores";

export const handleServerStore = (key: StoreName) => {
	"use server";

	if (key === 'raw') {
		setRawSignal('forServer');
	} else if (key === 'piquo') {
		const { setPiqueSignal } = piquoStore('piquoSignal');
		setPiqueSignal('forServer');
	}
};
