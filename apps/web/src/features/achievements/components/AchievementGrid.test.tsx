import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { PropsWithChildren, ReactNode } from "react";

vi.mock("../../../components/Tooltip", () => ({
	Tooltip: ({ children, content }: PropsWithChildren<{ content: ReactNode }>) => (
		<div>
			{children}
			{content}
		</div>
	),
}));

import { AchievementGrid } from "./AchievementGrid";

describe("AchievementGrid", () => {
	it("renders every achievement and distinguishes unlocked entries", () => {
		render(
			<AchievementGrid
				unlocks={[
					{
						achievementId: "defeat_boss",
						unlockedAt: "2026-07-31T12:00:00.000Z",
					},
				]}
				progress={[{ achievementId: "lifetime_kills_100", current: 42, target: 100 }]}
			/>,
		);

		const achievementTiles = screen.getAllByRole("listitem");
		expect(achievementTiles).toHaveLength(40);
		expect(within(achievementTiles[0]).getByText("Boss Breaker: Unlocked")).toBeInTheDocument();
		expect(
			within(achievementTiles[39]).getByText("Proven Champion: Locked"),
		).toBeInTheDocument();
		expect(screen.getByText("Boss Breaker: Unlocked")).toBeInTheDocument();
		expect(screen.getByText("Against All Odds: Locked")).toBeInTheDocument();
		expect(screen.getAllByText(/Unlocked/)).toHaveLength(2);
		expect(screen.getByText("Progress: 42 / 100")).toBeInTheDocument();
	});
});
