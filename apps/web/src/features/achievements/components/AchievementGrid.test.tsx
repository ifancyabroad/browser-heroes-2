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
	it("distinguishes unlocked entries and shows progress", () => {
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

		expect(screen.getAllByRole("listitem").length).toBeGreaterThan(0);
		expect(screen.getByText("Boss Breaker: Unlocked")).toBeInTheDocument();
		expect(screen.getByText("Progress: 42 / 100")).toBeInTheDocument();
	});
});
