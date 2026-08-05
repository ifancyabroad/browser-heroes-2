import type { Socket } from "socket.io";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createTestRunDocument } from "../test/createTestRun";

const engineService = vi.hoisted(() => ({
	applyRunAction: vi.fn(),
}));

vi.mock("../services/engine.service", () => engineService);

import { registerRunSocket } from "./run.socket";

type RunActionHandler = (payload: unknown, respond?: (response: unknown) => void) => Promise<void>;

function createSocket(userId?: string) {
	let handler: RunActionHandler | undefined;
	const socket = {
		request: { session: { userId } },
		on: vi.fn((event: string, registeredHandler: RunActionHandler) => {
			if (event === "run:action") {
				handler = registeredHandler;
			}
		}),
	} as unknown as Socket;

	registerRunSocket(socket);

	return {
		socket,
		invoke: async (payload: unknown) => {
			const respond = vi.fn();
			await handler!(payload, respond);
			return respond;
		},
		invokeWithoutAck: async (payload: unknown) => handler!(payload),
	};
}

describe("registerRunSocket", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("registers the run action event", () => {
		const { socket } = createSocket("user-id");

		expect(socket.on).toHaveBeenCalledWith("run:action", expect.any(Function));
	});

	it("ignores actions without an acknowledgement callback", async () => {
		await createSocket("user-id").invokeWithoutAck({
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(engineService.applyRunAction).not.toHaveBeenCalled();
	});

	it("limits each socket to ten actions per second", async () => {
		vi.useFakeTimers();
		const client = createSocket();

		for (let action = 0; action < 10; action += 1) {
			const respond = await client.invoke(undefined);
			expect(respond).toHaveBeenLastCalledWith({ ok: false, error: "UNAUTHENTICATED" });
		}

		const limitedResponse = await client.invoke(undefined);
		expect(limitedResponse).toHaveBeenCalledWith({ ok: false, error: "RATE_LIMITED" });

		vi.advanceTimersByTime(1_000);
		const resetResponse = await client.invoke(undefined);
		expect(resetResponse).toHaveBeenCalledWith({ ok: false, error: "UNAUTHENTICATED" });
	});

	it("rejects unauthenticated actions before validation", async () => {
		const respond = await createSocket().invoke(undefined);

		expect(respond).toHaveBeenCalledWith({ ok: false, error: "UNAUTHENTICATED" });
		expect(engineService.applyRunAction).not.toHaveBeenCalled();
	});

	it("rejects malformed payloads before orchestration", async () => {
		const respond = await createSocket("user-id").invoke({
			runId: "",
			action: { type: "UNKNOWN" },
		});

		expect(respond).toHaveBeenCalledWith({
			ok: false,
			error: expect.stringContaining("["),
		});
		expect(engineService.applyRunAction).not.toHaveBeenCalled();
	});

	it("applies valid actions and projects the response", async () => {
		const run = createTestRunDocument();
		const result = { ok: true, state: run.state, events: [] };
		engineService.applyRunAction.mockResolvedValue({ run, result });

		const respond = await createSocket("user-id").invoke({
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(engineService.applyRunAction).toHaveBeenCalledWith({
			userId: "user-id",
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});
		expect(respond).toHaveBeenCalledWith({
			ok: true,
			data: expect.objectContaining({ result }),
		});
	});

	it("returns thrown error messages", async () => {
		engineService.applyRunAction.mockRejectedValue(new Error("RUN_NOT_FOUND"));

		const respond = await createSocket("user-id").invoke({
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(respond).toHaveBeenCalledWith({ ok: false, error: "RUN_NOT_FOUND" });
	});

	it("returns a stable error for non-Error failures", async () => {
		engineService.applyRunAction.mockRejectedValue("failure");

		const respond = await createSocket("user-id").invoke({
			runId: "run-id",
			action: { type: "PLAYER_SKIP_TURN" },
		});

		expect(respond).toHaveBeenCalledWith({ ok: false, error: "UNKNOWN_ERROR" });
	});
});
