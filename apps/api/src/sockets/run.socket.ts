import type { Socket } from "socket.io";
import { applyRunAction } from "../services/engine.service";
import { RunActionPayload, runActionPayloadSchema, RunActionResponse } from "@app/shared";
import { toApplyRunActionResponse } from "../services/projection.service";

export function registerRunSocket(socket: Socket) {
	socket.on(
		"run:action",
		async (payload: RunActionPayload, respond: (response: RunActionResponse) => void) => {
			try {
				const userId = socket.request.session.userId;

				if (!userId) {
					respond({
						ok: false,
						error: "UNAUTHENTICATED",
					});
					return;
				}

				const parsedPayload = runActionPayloadSchema.parse(payload);

				const response = await applyRunAction({
					userId,
					runId: parsedPayload.runId,
					action: parsedPayload.action,
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
				respond({
					ok: false,
					error: error instanceof Error ? error.message : "UNKNOWN_ERROR",
				});
			}
		},
	);
}
