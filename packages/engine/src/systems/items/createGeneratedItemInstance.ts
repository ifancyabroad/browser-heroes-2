import type { ItemBase } from "@app/content";

import type { GeneratedItemInstance } from "../../schemas";
import { createGeneratedItemDefinition } from "./createGeneratedItemDefinition";
import { type RngState } from "../../core/rng";

type CreateGeneratedItemInstanceInput = {
	instanceId: string;
	base: ItemBase;
	level: number;
	rngState: RngState;
};

type CreateGeneratedItemInstanceResult = {
	value: GeneratedItemInstance;
	rngState: RngState;
};

export function createGeneratedItemInstance(
	input: CreateGeneratedItemInstanceInput,
): CreateGeneratedItemInstanceResult {
	const itemResult = createGeneratedItemDefinition({
		base: input.base,
		level: input.level,
		rngState: input.rngState,
	});

	return {
		value: {
			instanceId: input.instanceId,
			type: "generated",
			item: itemResult.value,
		},
		rngState: itemResult.rngState,
	};
}
