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
					displayName: "Player",
					hero: {
						id: "hero-1",
						name: "Aria",
						classId: "warrior",
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
						featIds: [
							"commanding_presence",
							"blood_drinker",
							"berserker",
							"gifted_healer",
							"flameborn",
						],
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

		expect(screen.getByText("Aria")).toHaveClass("text-primary");
		expect(screen.getByText(/\(Player\)/)).toHaveClass("text-info");
		expect(screen.getByText("Level 9 Warrior")).toBeInTheDocument();
		expect(screen.getByText("Slain by The Nameless One")).toBeInTheDocument();
		expect(screen.getByText("Battle")).toBeInTheDocument();
		expect(screen.getByText("42")).toBeInTheDocument();
		expect(screen.getByText("Cycle")).toBeInTheDocument();
		expect(screen.getByText("2")).toBeInTheDocument();
		expect(screen.getByText("Heavy Strike")).toBeInTheDocument();
		expect(screen.getByText("Commanding Presence")).toBeInTheDocument();
		expect(
			screen
				.getByRole("region", { name: "Skills" })
				.compareDocumentPosition(screen.getByRole("region", { name: "Feats" })),
		).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
		expect(screen.getAllByText("Passive")).toHaveLength(5);
		expect(screen.getByRole("region", { name: "Combat" })).toHaveTextContent("Max HP");
		expect(screen.getByText("Armour")).toBeInTheDocument();
		expect(screen.queryByText("Attack")).not.toBeInTheDocument();
		expect(screen.queryByText("Save")).not.toBeInTheDocument();
		expect(screen.queryByText("Save DC")).not.toBeInTheDocument();
		expect(screen.getByText("Crit Range")).toBeInTheDocument();
		expect(screen.getByText("Crit Dice")).toBeInTheDocument();
		expect(screen.getByText("Healing")).toBeInTheDocument();
		const damageSection = screen.getByRole("region", { name: "Damage" });
		expect(damageSection).toHaveTextContent("VulnerabilitiesCold");
		expect(damageSection).toHaveTextContent("Damage");
		expect(damageSection).toHaveTextContent("+50% Fire");
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
