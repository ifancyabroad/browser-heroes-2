import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";

const useDailyChallengeSummary = vi.hoisted(() => vi.fn());

vi.mock("../hooks/useDailyChallengeSummary", () => ({ useDailyChallengeSummary }));

import { DailyChallengeResult } from "./DailyChallengeResult";

function renderResult(outcome: "dead" | "retired" = "dead") {
	return render(
		<MemoryRouter>
			<DailyChallengeResult date="2026-08-23" outcome={outcome} />
		</MemoryRouter>,
	);
}

describe("DailyChallengeResult", () => {
	beforeEach(() => {
		useDailyChallengeSummary.mockReturnValue({
			isPending: false,
			data: { challenge: { attempt: { rankedEntry: { rank: 12 } } } },
		});
	});

	it("presents a completed attempt and rank separately from the leaderboard link", () => {
		renderResult();

		expect(screen.getByRole("region", { name: "DAILY CHALLENGE COMPLETE" })).toHaveTextContent(
			"You currently rank #12. A worthy attempt in the dungeon.",
		);
		expect(screen.getByRole("link", { name: "View leaderboard" })).toHaveAttribute(
			"href",
			"/daily-challenge?date=2026-08-23",
		);
	});

	it("uses victory copy for a retired run", () => {
		renderResult("retired");

		expect(screen.getByText(/A triumphant challenge run/)).toBeInTheDocument();
	});

	it("shows a calculation message while the rank is loading", () => {
		useDailyChallengeSummary.mockReturnValue({ isPending: true, data: undefined });

		renderResult();

		expect(screen.getByText("Your rank is being calculated...")).toBeInTheDocument();
	});

	it("keeps the leaderboard available when no rank can be shown", () => {
		useDailyChallengeSummary.mockReturnValue({ isPending: false, data: undefined });

		renderResult();

		expect(screen.getByText("Your attempt is recorded.")).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "View leaderboard" })).toBeInTheDocument();
	});
});
