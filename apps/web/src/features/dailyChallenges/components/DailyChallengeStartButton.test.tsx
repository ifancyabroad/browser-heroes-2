import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import type { RunView } from "@app/shared";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
	useAuth: vi.fn(),
	useCreateGuestSession: vi.fn(),
	useStartDailyChallenge: vi.fn(),
}));

vi.mock("../../auth", () => ({
	useAuth: mocks.useAuth,
	useCreateGuestSession: mocks.useCreateGuestSession,
}));
vi.mock("../hooks/useStartDailyChallenge", () => ({
	useStartDailyChallenge: mocks.useStartDailyChallenge,
}));
vi.mock("../../createCharacter", () => ({
	HeroNameModal: () => <div role="dialog">Name your hero</div>,
}));

import { DailyChallengeStartButton } from "./DailyChallengeStartButton";

describe("DailyChallengeStartButton", () => {
	beforeEach(() => {
		mocks.useAuth.mockReturnValue({ hasSession: true });
		mocks.useCreateGuestSession.mockReturnValue({ isPending: false });
		mocks.useStartDailyChallenge.mockReturnValue({ isPending: false });
	});

	it("opens hero naming immediately when there is no active run", () => {
		render(
			<MemoryRouter>
				<DailyChallengeStartButton />
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByRole("button", { name: "START DAILY CHALLENGE" }));
		expect(screen.getByRole("dialog")).toHaveTextContent("Name your hero");
	});

	it("warns before replacing an active run", () => {
		const currentRun = {
			summary: { heroName: "Ada" },
		} as RunView;

		render(
			<MemoryRouter>
				<DailyChallengeStartButton currentRun={currentRun} />
			</MemoryRouter>,
		);

		fireEvent.click(screen.getByRole("button", { name: "START DAILY CHALLENGE" }));
		expect(screen.getByRole("dialog", { name: "ABANDON CURRENT RUN?" })).toHaveTextContent(
			"Ada",
		);
		expect(screen.queryByText("Name your hero")).not.toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "ABANDON RUN" }));
		expect(screen.getByRole("dialog")).toHaveTextContent("Name your hero");
	});
});
