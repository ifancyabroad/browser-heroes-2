import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const useAuth = vi.hoisted(() => vi.fn());
const useAchievements = vi.hoisted(() => vi.fn());

vi.mock("../components/Header", () => ({ Header: () => <div>Header</div> }));
vi.mock("../features/auth", () => ({ useAuth }));
vi.mock("../features/achievements", () => ({
	useAchievements,
	AchievementGrid: ({ unlocks }: { unlocks: unknown[] }) => (
		<div>Grid with {unlocks.length} unlocks</div>
	),
}));

import Progress from "./Progress";

describe("Progress", () => {
	it("shows account progress for a session user", () => {
		useAuth.mockReturnValue({ hasSession: true });
		useAchievements.mockReturnValue({
			data: {
				unlocks: [
					{
						achievementId: "defeat_boss",
						unlockedAt: "2026-07-31T12:00:00.000Z",
					},
				],
			},
			isPending: false,
			isError: false,
		});

		render(<Progress />);

		expect(screen.getByText("1 / 30 UNLOCKED")).toBeInTheDocument();
		expect(screen.getByText("Grid with 1 unlocks")).toBeInTheDocument();
		expect(useAchievements).toHaveBeenCalledWith(true);
	});

	it("does not request achievements without a user session", () => {
		useAuth.mockReturnValue({ hasSession: false });
		useAchievements.mockReturnValue({ isPending: false, isError: false });

		render(<Progress />);

		expect(screen.getByText(/Start a hero/)).toBeInTheDocument();
		expect(useAchievements).toHaveBeenCalledWith(false);
	});
});
