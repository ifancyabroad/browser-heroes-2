import { render, screen } from "@testing-library/react";
import type { RunView } from "@app/shared";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hooks = vi.hoisted(() => ({ useDailyChallengeSummary: vi.fn() }));
vi.mock("../hooks/useDailyChallengeSummary", () => hooks);
vi.mock("./DailyChallengeStartButton", () => ({
	DailyChallengeStartButton: () => <button>START DAILY CHALLENGE</button>,
}));

import { DailyChallengeLandingPanel } from "./DailyChallengeLandingPanel";

describe("DailyChallengeLandingPanel", () => {
	beforeEach(() => {
		hooks.useDailyChallengeSummary.mockReturnValue({
			data: {
				challenge: {
					date: "2026-08-23",
					classId: "warrior",
					attemptCount: 14,
					leader: {
						heroName: "Aria",
						kills: 31,
						displayName: "Player",
						isCurrentUser: true,
					},
					attempt: null,
					canStart: true,
				},
			},
			isPending: false,
			isError: false,
		});
	});

	it("presents today's challenge as the primary action with useful context", () => {
		render(
			<MemoryRouter>
				<DailyChallengeLandingPanel currentRun={null} />
			</MemoryRouter>,
		);
		expect(screen.getByRole("heading", { name: "DAILY CHALLENGE" })).toBeInTheDocument();
		expect(
			screen.getByText(
				"Everyone faces the same adventure with the same hero class. One attempt. How far can you get?",
			),
		).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Current leader" })).toBeVisible();
		expect(screen.getByText("Aria")).toHaveClass("text-primary");
		expect(screen.getByText("(Player)")).toBeVisible();
		expect(screen.queryByText(/ATTEMPTS/)).not.toBeInTheDocument();
		expect(screen.getByText("31 KILLS")).toBeVisible();
		expect(screen.getByRole("button", { name: "START DAILY CHALLENGE" })).toBeInTheDocument();
		expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
		expect(screen.queryByRole("button", { name: /Inspect hero/ })).not.toBeInTheDocument();
	});

	it.each([true, false])("handles no leader when canStart is %s", (canStart) => {
		hooks.useDailyChallengeSummary.mockReturnValue({
			data: { challenge: { leader: null, canStart } },
			isPending: false,
			isError: false,
		});
		render(
			<MemoryRouter>
				<DailyChallengeLandingPanel currentRun={null} />
			</MemoryRouter>,
		);
		expect(screen.getByText("Be the first to finish today’s challenge.")).toBeVisible();
		expect(screen.queryByRole("img", { name: "Current leader" })).not.toBeInTheDocument();
		if (canStart) {
			expect(screen.getByRole("button", { name: "START DAILY CHALLENGE" })).toBeVisible();
		} else {
			expect(screen.getByRole("link", { name: "VIEW RESULTS" })).toHaveAttribute(
				"href",
				"/daily-challenge",
			);
		}
	});

	it("reserves the completed card layout while loading", () => {
		hooks.useDailyChallengeSummary.mockReturnValue({
			data: undefined,
			isPending: true,
			isError: false,
		});

		render(
			<MemoryRouter>
				<DailyChallengeLandingPanel currentRun={null} />
			</MemoryRouter>,
		);

		expect(screen.getByRole("heading", { name: "Loading Daily Challenge..." })).toBeVisible();
		expect(
			screen
				.getByText("Be the first to finish today’s challenge.")
				.closest('[aria-hidden="true"]'),
		).not.toBeNull();
		expect(
			screen.getByText("START DAILY CHALLENGE").closest('[aria-hidden="true"]'),
		).not.toBeNull();
	});

	it("reserves the leader row when an active challenge is loading", () => {
		hooks.useDailyChallengeSummary.mockReturnValue({
			data: undefined,
			isPending: true,
			isError: false,
		});
		const run = {
			mode: "dailyChallenge",
			dailyChallengeDate: "2026-08-23",
			summary: { heroName: "Ada" },
		} as RunView;

		render(
			<MemoryRouter>
				<DailyChallengeLandingPanel currentRun={run} />
			</MemoryRouter>,
		);

		expect(
			screen
				.getByText("Be the first to finish today’s challenge.")
				.closest('[aria-hidden="true"]'),
		).not.toBeNull();
		expect(
			screen.getByText("CONTINUE DAILY CHALLENGE").closest('[aria-hidden="true"]'),
		).not.toBeNull();
	});

	it("preserves the card layout when the challenge is unavailable", () => {
		hooks.useDailyChallengeSummary.mockReturnValue({
			data: undefined,
			isPending: false,
			isError: true,
		});

		render(
			<MemoryRouter>
				<DailyChallengeLandingPanel currentRun={null} />
			</MemoryRouter>,
		);

		expect(screen.getByRole("heading", { name: "Daily Challenge unavailable." })).toBeVisible();
		expect(
			screen.getByText("START DAILY CHALLENGE").closest('[aria-hidden="true"]'),
		).not.toBeNull();
	});

	it("continues an active daily run instead of offering another attempt", () => {
		const run = {
			mode: "dailyChallenge",
			dailyChallengeDate: "2026-08-22",
			summary: { classId: "mage", heroName: "Ada" },
		} as RunView;
		render(
			<MemoryRouter>
				<DailyChallengeLandingPanel currentRun={run} />
			</MemoryRouter>,
		);
		expect(screen.getByRole("link", { name: "CONTINUE DAILY CHALLENGE" })).toHaveAttribute(
			"href",
			"/game",
		);
		expect(
			screen.queryByRole("button", { name: "START DAILY CHALLENGE" }),
		).not.toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Current leader" })).toBeVisible();
	});
});
