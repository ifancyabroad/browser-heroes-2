import { engineActionSchema, type EngineAction } from "../schemas";

export type ValidateActionResult =
	| {
			ok: true;
			action: EngineAction;
	  }
	| {
			ok: false;
			error: string;
	  };

export function validateAction(input: unknown): ValidateActionResult {
	const parsed = engineActionSchema.safeParse(input);

	if (!parsed.success) {
		return {
			ok: false,
			error: parsed.error.message,
		};
	}

	return {
		ok: true,
		action: parsed.data,
	};
}
