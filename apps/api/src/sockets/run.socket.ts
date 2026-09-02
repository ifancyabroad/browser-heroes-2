import type { Socket } from "socket.io";
import { applyRunAction } from "../services/engine.service";
import { RunActionPayload, runActionPayloadSchema, RunActionResponse } from "@app/shared";
import { toApplyRunActionResponse } from "../services/projection.service";

const ACTION_LIMIT = 10;
const ACTION_WINDOW_MS = 1_000;

export function registerRunSocket(socket: Socket) {
	let actionCount = 0;
	let actionWindowStartedAt = Date.now();

	socket.on(
		"run:action",
		async (payload: RunActionPayload, respond?: (response: RunActionResponse) => void) => {
			if (typeof respond !== "function") {
				return;
			}

			const now = Date.now();
			if (now - actionWindowStartedAt >= ACTION_WINDOW_MS) {
				actionCount = 0;
				actionWindowStartedAt = now;
			}

			if (actionCount >= ACTION_LIMIT) {
				respond({ ok: false, error: "RATE_LIMITED" });
				return;
			}
			actionCount += 1;

			const userId = socket.request.session.userId;

			if (!userId) {
				respond({
					ok: false,
					error: "UNAUTHENTICATED",
				});
				return;
			}

			const parsedPayload = runActionPayloadSchema.safeParse(payload);
			if (!parsedPayload.success) {
				respond({ ok: false, error: "INVALID_PAYLOAD" });
				return;
			}

			try {
				const response = await applyRunAction({
					userId,
					runId: parsedPayload.data.runId,
					action: parsedPayload.data.action,
				});

				respond({
					ok: true,
					data: toApplyRunActionResponse(
						response.run,
						response.result,
						response.unlockedAchievements,
					),
				});
			} catch (error) {
				if (error instanceof Error && error.message === "RUN_NOT_FOUND") {
					respond({ ok: false, error: error.message });
					return;
				}

				console.error("Run action failed.", {
					userId,
					runId: parsedPayload.data.runId,
					actionType: parsedPayload.data.action.type,
					error,
				});
				respond({
					ok: false,
					error: "INTERNAL_SERVER_ERROR",
				});
			}
		},
	);
}
