import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const useRunHero = vi.hoisted(() => vi.fn());

vi.mock("../../runs", () => ({ useRunHero }));
vi.mock("../../../components/Modal", () => ({
	Modal: ({
		open,
		title,
		children,
		footer,
	}: {
		open: boolean;
		title: string;
		children: React.ReactNode;
		footer: React.ReactNode;
	}) =>
		open ? (
			<div aria-label={title}>
				{children}
				{footer}
			</div>
		) : null,
}));
vi.mock("../../../components/Tooltip", () => ({
	Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { HeroDossierModal } from "./HeroDossierModal";

const emptyEquipment = {
	head: null,
	neck: null,
	body: null,
	hands: null,
	finger1: null,
	finger2: null,
	waist: null,
	feet: null,
	mainHand: null,
	offHand: null,
};

function queryState(overrides = {}) {
	return {
		data: undefined,
		isPending: false,
		isError: false,
		refetch: vi.fn(),
		...overrides,
	};
}

describe("HeroDossierModal", () => {
	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("shows loading without rendering retrieval failures inline", () => {
		useRunHero.mockReturnValue(queryState({ isPending: true }));
		const { rerender } = render(<HeroDossierModal runId="run-1" onClose={vi.fn()} />);
		expect(screen.getByText("Retrieving hero record...")).toBeInTheDocument();

		useRunHero.mockReturnValue(queryState({ isError: true }));
		rerender(<HeroDossierModal runId="run-1" onClose={vi.fn()} />);
		expect(screen.queryByRole("button", { name: "RETRY" })).not.toBeInTheDocument();
	});

	it("renders a concise build dossier and omits low-value run resources", () => {
		useRunHero.mockReturnValue(
			queryState({
				data: {
					hero: {
						id: "hero-1",
						name: "Aria",
						classId: "fighter",
						level: 9,
						xp: 900,
						maxHp: 80,
						currentHp: 0,
						attributes: {
							strength: 18,
							dexterity: 12,
							constitution: 16,
							intelligence: 8,
							wisdom: 10,
							charisma: 11,
						},
						skills: [{ skillId: "heavy_strike", chargesRemaining: 1 }],
						featIds: ["herculean_strength"],
						equipment: emptyEquipment,
						pendingLevelUp: null,
						healingPotions: 3,
					},
					run: {
						status: "dead",
						battleNumber: 42,
						zoneNumber: 5,
						endlessCycle: 2,
						day: 12,
						kills: 41,
						gold: 999,
						streak: 8,
						hasDefeatedFinalBoss: false,
						slainBy: {
							sourceId: "enemy-1",
							name: "The Nameless One",
							encounterType: "boss",
						},
					},
				},
			}),
		);

		render(<HeroDossierModal runId="run-1" onClose={vi.fn()} />);

		expect(screen.getByText("Aria the Fighter")).toBeInTheDocument();
		expect(screen.getByText("Slain by The Nameless One")).toBeInTheDocument();
		expect(screen.getByText("Battle")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
		expect(screen.getByText("Cycle")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("Heavy Strike")).toBeInTheDocument();
		expect(screen.getByText("Herculean Strength")).toBeInTheDocument();
		expect(screen.getByRole("region", { name: "Combat" })).toHaveTextContent("Maximum Health");
		expect(screen.getByText("Armour Class")).toBeInTheDocument();
		expect(screen.getByText("Attack Roll Bonus")).toBeInTheDocument();
		expect(screen.getByText("Saving Throw Bonus")).toBeInTheDocument();
		expect(screen.getByText("Save DC Bonus")).toBeInTheDocument();
		expect(screen.getByText("No equipment worn.")).toBeInTheDocument();
		expect(screen.queryByText("999")).not.toBeInTheDocument();
		expect(screen.queryByText(/potion/i)).not.toBeInTheDocument();
	});

	it("closes from the explicit action", () => {
		const onClose = vi.fn();
		useRunHero.mockReturnValue(queryState({ isPending: true }));
		render(<HeroDossierModal runId="run-1" onClose={onClose} />);

		fireEvent.click(screen.getByRole("button", { name: "CLOSE" }));
		expect(onClose).toHaveBeenCalledOnce();
	});
});
