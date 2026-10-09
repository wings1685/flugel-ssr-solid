"use server";

import { query } from "@solidjs/router";
import { rawSignal } from "@/_global/stores/raw";
import { piquoStore } from "@/_global/piquo";

export const loadFromServer = query(async () => {
	const { piquoSignal } = piquoStore('piquoSignal');

	return {
		rawSignalServer: rawSignal.forServer, piquoSignalServer: piquoSignal().forServer,
	};
}, 'from-server');
