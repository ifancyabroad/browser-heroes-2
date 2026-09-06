import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const hooks = vi.hoisted(() => ({
	useAuth: vi.fn(),
	useHeroHallOfFame: vi.fn(),
	useGhostHallOfFame: vi.fn(),
}));
vi.mock("../features/auth", () => ({ useAuth: hooks.useAuth }));
vi.mock("../features/hallOfFame", async (importOriginal) => ({
	...(await importOriginal<typeof import("../features/hallOfFame")>()),
	useHeroHallOfFame: hooks.useHeroHallOfFame,
	useGhostHallOfFame: hooks.useGhostHallOfFame,
	HeroHallOfFameTable: () => <div>Hero rankings</div>,
	GhostHallOfFameTable: () => <div>Ghost rankings</div>,
}));
vi.mock("../features/heroDossier", () => ({ HeroDossierModal: () => null }));
vi.mock("../components/Header", () => ({ Header: () => null }));
vi.mock("../components/Footer", () => ({ Footer: () => null }));
vi.mock("../components/Tabs", () => ({
	Tabs: ({
		value,
		onChange,
		renderPanel,
	}: {
		value: "heroes" | "ghosts";
		onChange: (value: "heroes" | "ghosts") => void;
		renderPanel: (value: "heroes" | "ghosts") => React.ReactNode;
	}) => (
		<div>
			<button onClick={() => onChange("ghosts")}>GHOSTS</button>
			{renderPanel(value)}
		</div>
	),
}));

import HallOfFame from "./HallOfFame";

function queryState(entries: object[] = []) {
	return {
		data: { entries, total: entries.length, totalPages: entries.length ? 1 : 0 },
		isPending: false,
		isError: false,
		isFetching: false,
	};
}

describe("HallOfFame", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		hooks.useAuth.mockReturnValue({ hasSession: true });
		hooks.useHeroHallOfFame.mockReturnValue(queryState([{}]));
		hooks.useGhostHallOfFame.mockReturnValue(queryState([{}]));
	});

	it("loads all heroes by default and switches to ghosts", () => {
		render(<HallOfFame />);
		expect(screen.getByText("Hero rankings")).toBeInTheDocument();
		expect(hooks.useHeroHallOfFame).toHaveBeenCalledWith({ page: 1, limit: 20 }, true);
		expect(hooks.useGhostHallOfFame).toHaveBeenCalledWith({ page: 1, limit: 20 }, false);

		fireEvent.click(screen.getByRole("button", { name: "GHOSTS" }));
		expect(screen.getByText("Ghost rankings")).toBeInTheDocument();
		expect(hooks.useGhostHallOfFame).toHaveBeenLastCalledWith({ page: 1, limit: 20 }, true);
	});

	it("offers ownership filtering only when a session exists", () => {
		const { rerender } = render(<HallOfFame />);
		fireEvent.click(screen.getByRole("button", { name: "MY HEROES" }));
		expect(hooks.useHeroHallOfFame).toHaveBeenLastCalledWith(
			{ userOnly: "true", page: 1, limit: 20 },
			true,
		);

		hooks.useAuth.mockReturnValue({ hasSession: false });
		rerender(<HallOfFame />);
		expect(screen.queryByRole("button", { name: "MY HEROES" })).not.toBeInTheDocument();
	});

	it("switches seasons and resets pagination", () => {
		hooks.useHeroHallOfFame.mockReturnValue({
			...queryState([{}]),
			data: {
				...queryState([{}]).data,
				season: 2,
				currentSeason: 2,
			},
		});

		render(<HallOfFame />);
		fireEvent.change(screen.getByLabelText("SEASON"), { target: { value: "1" } });

		expect(hooks.useHeroHallOfFame).toHaveBeenLastCalledWith(
			{ season: 1, page: 1, limit: 20 },
			true,
		);
	});
});
