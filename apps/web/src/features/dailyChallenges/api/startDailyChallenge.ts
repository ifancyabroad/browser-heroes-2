import type { StartChallengeBody, StartChallengeResponse } from "@app/shared";
import { api } from "../../../lib/api";

export function startDailyChallenge(body: StartChallengeBody) {
	return api.post("daily-challenges/today/runs", { json: body }).json<StartChallengeResponse>();
}
