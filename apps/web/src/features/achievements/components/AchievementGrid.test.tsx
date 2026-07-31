import { render, screen } from "@testing-library/react";
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
			/>,
		);

		expect(screen.getAllByRole("listitem")).toHaveLength(20);
		expect(screen.getByText("Boss Breaker: Unlocked")).toBeInTheDocument();
		expect(screen.getByText("Against All Odds: Locked")).toBeInTheDocument();
		expect(screen.getAllByText(/Unlocked/)).toHaveLength(2);
	});
});
