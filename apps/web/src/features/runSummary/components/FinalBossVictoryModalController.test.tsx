import { fireEvent, render, screen } from "@testing-library/react";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

const selectAvailableActions = vi.hoisted(() => vi.fn());
const mutate = vi.hoisted(() => vi.fn());
const showError = vi.hoisted(() => vi.fn());

vi.mock("@app/engine", async (importOriginal) => ({
	...(await importOriginal<typeof import("@app/engine")>()),
	selectAvailableActions,
}));
vi.mock("../../runs", () => ({
	useApplyRunAction: () => ({ mutate, isPending: false }),
	getEngineErrorMessage: (error: string) => `Engine: ${error}`,
}));
vi.mock("../../../stores/errorModalStore", () => ({
	useErrorModalStore: (selector: (state: { showError: typeof showError }) => unknown) =>
		selector({ showError }),
}));
vi.mock("../../../components/Modal", () => ({
	Modal: ({
		title,
		children,
		footer,
	}: {
		title: string;
		children: React.ReactNode;
		footer: React.ReactNode;
	}) => (
		<div role="dialog" aria-label={title}>
			{children}
			{footer}
		</div>
	),
}));

import { FinalBossVictoryModalController } from "./FinalBossVictoryModalController";

function createRun(phase: "combat" | "town" = "combat") {
	return { id: "run-id", state: { phase, hero: { name: "Test Hero" } } } as RunView;
}

describe("FinalBossVictoryModalController", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		selectAvailableActions.mockReturnValue([
			{ type: "RETIRE_RUN" },
			{ type: "RETURN_TO_TOWN" },
			{ type: "CONTINUE_TO_NEXT_COMBAT" },
		]);
	});

	it("only appears during combat when retirement is available", () => {
		const { rerender } = render(<FinalBossVictoryModalController run={createRun("town")} />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

		selectAvailableActions.mockReturnValue([]);
		rerender(<FinalBossVictoryModalController run={createRun()} />);
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
	});

	it.each([
		["Retire", { type: "RETIRE_RUN" }],
		["Town", { type: "RETURN_TO_TOWN" }],
		["Continue", { type: "CONTINUE_TO_NEXT_COMBAT" }],
	])("submits the %s choice", (button, action) => {
		render(<FinalBossVictoryModalController run={createRun()} />);

		fireEvent.click(screen.getByRole("button", { name: button }));

		expect(mutate).toHaveBeenCalledWith({ runId: "run-id", action }, expect.any(Object));
	});

	it("disables choices that are not available", () => {
		selectAvailableActions.mockReturnValue([{ type: "RETIRE_RUN" }]);

		render(<FinalBossVictoryModalController run={createRun()} />);

		expect(screen.getByRole("button", { name: "Town" })).toBeDisabled();
		expect(screen.getByRole("button", { name: "Continue" })).toBeDisabled();
	});

	it("names the hero in the victory message", () => {
		render(<FinalBossVictoryModalController run={createRun()} />);

		expect(screen.getByText(/Test Hero has earned their rest/)).toBeInTheDocument();
		expect(
			screen.getByText(/WARNING: Continuing leaves retirement behind/),
		).toBeInTheDocument();
	});

	it("shows translated engine failures", () => {
		render(<FinalBossVictoryModalController run={createRun()} />);
		fireEvent.click(screen.getByRole("button", { name: "Retire" }));
		mutate.mock.calls[0][1].onSuccess({ result: { ok: false, error: "RUN_ENDED" } });

		expect(showError).toHaveBeenCalledWith("Engine: RUN_ENDED");
	});

	it("shows choice-specific transport failures", () => {
		render(<FinalBossVictoryModalController run={createRun()} />);
		fireEvent.click(screen.getByRole("button", { name: "Continue" }));
		mutate.mock.calls[0][1].onError();

		expect(showError).toHaveBeenCalledWith("Unable to continue onwards. Please try again.");
	});
});
