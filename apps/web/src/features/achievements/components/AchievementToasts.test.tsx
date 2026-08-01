import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useAchievementToastStore } from "../stores/achievementToastStore";
import { AchievementToasts } from "./AchievementToasts";

describe("AchievementToasts", () => {
	beforeEach(() => {
		useAchievementToastStore.setState({ toasts: [] });
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("renders stacked achievement details in a bottom-right viewport", () => {
		useAchievementToastStore.getState().showAchievementUnlocks([
			{ achievementId: "defeat_boss", unlockedAt: "2026-01-01T00:00:00.000Z" },
			{ achievementId: "complete_game", unlockedAt: "2026-01-01T00:00:01.000Z" },
		]);

		render(<AchievementToasts />);

		expect(screen.getAllByText("ACHIEVEMENT UNLOCKED")).toHaveLength(2);
		expect(screen.getByText("Boss Breaker")).toBeInTheDocument();
		expect(screen.getByText("Defeat any boss.")).toBeInTheDocument();
		expect(screen.getByText("Against All Odds")).toBeInTheDocument();
		const viewport = screen.getByRole("list");
		expect(viewport).toHaveClass("bottom-4", "right-4", "flex-col");
	});

	it("dismisses an individual notification with its close control", async () => {
		useAchievementToastStore
			.getState()
			.showAchievementUnlocks([
				{ achievementId: "defeat_boss", unlockedAt: "2026-01-01T00:00:00.000Z" },
			]);
		render(<AchievementToasts />);

		fireEvent.click(screen.getByRole("button", { name: "Dismiss Boss Breaker notification" }));

		await waitFor(() => expect(useAchievementToastStore.getState().toasts).toEqual([]));
		expect(screen.queryByText("Boss Breaker")).not.toBeInTheDocument();
	});

	it("auto-dismisses notifications after the provider duration", () => {
		vi.useFakeTimers();
		useAchievementToastStore
			.getState()
			.showAchievementUnlocks([
				{ achievementId: "defeat_boss", unlockedAt: "2026-01-01T00:00:00.000Z" },
			]);
		render(<AchievementToasts />);

		act(() => vi.advanceTimersByTime(6_000));
		act(() => vi.advanceTimersByTime(200));

		expect(useAchievementToastStore.getState().toasts).toEqual([]);
	});

	it("resumes remaining auto-dismiss timers after manually closing a focused toast", () => {
		vi.useFakeTimers();
		useAchievementToastStore.getState().showAchievementUnlocks([
			{ achievementId: "defeat_boss", unlockedAt: "2026-01-01T00:00:00.000Z" },
			{ achievementId: "complete_game", unlockedAt: "2026-01-01T00:00:01.000Z" },
		]);
		render(<AchievementToasts />);
		const closeButton = screen.getByRole("button", {
			name: "Dismiss Boss Breaker notification",
		});
		closeButton.focus();

		fireEvent.click(closeButton);
		act(() => vi.advanceTimersByTime(200));
		expect(useAchievementToastStore.getState().toasts).toHaveLength(1);

		act(() => vi.advanceTimersByTime(6_000));
		act(() => vi.advanceTimersByTime(200));
		expect(useAchievementToastStore.getState().toasts).toEqual([]);
	});
});
