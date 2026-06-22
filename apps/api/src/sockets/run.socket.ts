import { engineActionSchema, type EngineAction } from "@app/engine";
import type { Socket } from "socket.io";
import { applyRunAction } from "../services/engine.service";

type RunActionPayload = {
	runId: string;
	action: EngineAction;
};

type RunActionResponse =
	| {
			ok: true;
			result: Awaited<ReturnType<typeof applyRunAction>>["result"];
	  }
	| {
			ok: false;
			error: string;
	  };

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

				const action = engineActionSchema.parse(payload.action);

				const { result } = await applyRunAction({
					userId,
					runId: payload.runId,
					action,
				});

				respond({
					ok: true,
					result,
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
