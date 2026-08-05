import type { EffectDuration } from "@app/content";

import type { ActiveEffectDuration } from "../../../schemas";

export function createActiveEffectDuration(duration: EffectDuration): ActiveEffectDuration {
	return {
		unit: duration.unit,
		remaining: duration.value,
	};
}
