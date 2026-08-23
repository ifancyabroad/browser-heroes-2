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
					leader: { kills: 31 },
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
		expect(screen.getByText("14 ATTEMPTS")).toBeInTheDocument();
		expect(screen.getByText("BEST 31 KILLS")).toBeInTheDocument();
		expect(screen.getByRole("button", { name: "START DAILY CHALLENGE" })).toBeInTheDocument();
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
	});
});
