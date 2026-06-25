import type { ApplyRunActionResponse, RunActionPayload, RunActionResponse } from "@app/shared";
import { socket } from "../../../lib/socket";

export function applyRunAction(payload: RunActionPayload): Promise<ApplyRunActionResponse> {
	return new Promise((resolve, reject) => {
		socket.emit("run:action", payload, (response: RunActionResponse) => {
			if (!response.ok) {
				reject(new Error(response.error));
				return;
			}

			resolve(response.data);
		});
	});
}
