import { runStateSchema, type DeserializeRunStateResult } from "../schemas";

export function deserializeRunState(input: unknown): DeserializeRunStateResult {
	const parsed = runStateSchema.safeParse(input);

	if (!parsed.success) {
		return {
			ok: false,
			error: parsed.error.message,
		};
	}

	return {
		ok: true,
		state: parsed.data,
	};
}

export function deserializeRunStateJson(json: string): DeserializeRunStateResult {
	try {
		const input = JSON.parse(json);
		return deserializeRunState(input);
	} catch {
		return {
			ok: false,
			error: "Invalid JSON",
		};
	}
}
