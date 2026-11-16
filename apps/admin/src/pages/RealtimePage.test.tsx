import { fireEvent, render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AdminActivityEntry } from "@app/shared";
const mock = vi.hoisted(() => ({ useRealtime: vi.fn() }));
vi.mock("../features/realtime", async (importOriginal) => ({
	...(await importOriginal<typeof import("../features/realtime")>()),
	useRealtime: mock.useRealtime,
}));
import { RealtimePage } from "./RealtimePage";

const entry: AdminActivityEntry = {
	id: "first",
	createdAt: "2026-11-16T12:00:00Z",
	runId: "run",
	heroName: "Mira",
	classId: "mage",
	mode: "normal",
	displayName: null,
	event: { type: "hero_created" },
};
function data(entries = [entry]) {
	return {
		entries,
		status: "Connected",
		pending: false,
		error: false,
		retry: vi.fn(),
		heroes: {
			data: {
				heroes: [
					{
						runId: "run",
						heroName: "Mira",
						classId: "mage",
						displayName: null,
						level: 3,
						battleNumber: 5,
						zone: "forest",
						mode: "normal",
						lastActivityAt: entry.createdAt,
					},
				],
			},
			dataUpdatedAt: Date.now(),
			isPending: false,
			isError: false,
			refetch: vi.fn(),
		},
	};
}

describe("RealtimePage", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});
	it("freezes displayed activity while paused and resumes with the latest buffer", () => {
		mock.useRealtime.mockReturnValue(data());
		const { rerender } = render(<RealtimePage />);
		expect(screen.queryByText(/Unnamed player/)).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Pause" }));
		mock.useRealtime.mockReturnValue(
			data([
				entry,
				{ ...entry, id: "next", event: { type: "level_up", level: 4, selection: null } },
			]),
		);
		rerender(<RealtimePage />);
		expect(screen.queryByText(/reached level 4/)).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Resume" }));
		expect(screen.getByText(/reached level 4/)).toBeInTheDocument();
		expect(
			within(screen.getByLabelText("Activity feed")).getAllByRole("listitem")[0],
		).toHaveTextContent("reached level 4");
		fireEvent.click(screen.getByRole("checkbox", { name: "Level-ups" }));
		expect(screen.queryByText(/reached level 4/)).not.toBeInTheDocument();
	});

	it("filters both panels by mode and retains hero selection when the hero disappears", () => {
		const entries = [
			entry,
			{
				...entry,
				id: "other",
				runId: "other",
				heroName: "Other",
				mode: "dailyChallenge" as const,
			},
		];
		mock.useRealtime.mockReturnValue(data(entries));
		const { rerender } = render(<RealtimePage />);
		fireEvent.change(screen.getByRole("combobox", { name: "Run mode" }), {
			target: { value: "dailyChallenge" },
		});
		expect(mock.useRealtime).toHaveBeenLastCalledWith("dailyChallenge");
		expect(screen.getByText("Other")).toBeInTheDocument();
		fireEvent.change(screen.getByRole("combobox"), { target: { value: "all" } });
		fireEvent.click(screen.getByRole("button", { name: "Mira" }));
		expect(screen.queryByText("Other")).not.toBeInTheDocument();
		const next = data(entries);
		next.heroes.data.heroes = [];
		mock.useRealtime.mockReturnValue(next);
		rerender(<RealtimePage />);
		expect(screen.getByText("Following Mira")).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Clear hero filter for Mira" }));
		expect(screen.getByText("Other")).toBeInTheDocument();
	});

	it("offers jump-to-latest when scrolling away, and exposes failure recovery", () => {
		const state = data();
		state.error = true;
		mock.useRealtime.mockReturnValue(state);
		render(<RealtimePage />);
		const feed = screen.getByLabelText("Activity feed");
		Object.defineProperties(feed, {
			scrollHeight: { value: 1000 },
			clientHeight: { value: 100 },
		});
		feed.scrollTop = 300;
		fireEvent.scroll(feed);
		fireEvent.click(screen.getByRole("button", { name: "Back to latest" }));
		expect(feed.scrollTop).toBe(0);
		fireEvent.click(screen.getByRole("button", { name: "Retry activity" }));
		expect(state.retry).toHaveBeenCalled();
	});
});
