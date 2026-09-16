import type { GetBestiaryResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function getBestiary(signal?: AbortSignal) {
	return api.get("bestiary", { signal }).json<GetBestiaryResponse>();
}
