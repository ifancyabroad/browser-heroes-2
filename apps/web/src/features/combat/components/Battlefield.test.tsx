import { act, fireEvent, render, screen } from "@testing-library/react";
import type { CombatLogEntry } from "@app/engine";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Battlefield } from "./Battlefield";

const baseProps = {
	heroId: "hero-1",
	enemyId: "enemy-1",
	enemyCurrentHp: 100,
	enemyPortrait: null,
	enemyName: "Orc",
	isEnemySlain: false,
	battleNumber: 12,
	goldMultiplier: 2,
	nextZone: "forest" as const,
	zone: "forest" as const,
	onOpenLog: vi.fn(),
};

describe("Battlefield combat outcomes", () => {
	it("shows hero healing separately from damage and ignores enemy and zero healing", () => {
		const healing = (
			id: string,
			amount: number,
			targetId = "hero-1",
			eventType: "healing_done" | "effect_triggered" = "healing_done",
		): CombatLogEntry => ({
			id,
			turnNumber: 1,
			actor: "player",
			message: "Healing",
			eventType,
			outcome: { type: "healing", targetId, amount },
		});
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);
		rerender(
			<Battlefield
				{...baseProps}
				entries={[
					healing("hero-heal", 15),
					healing("hero-tick", 4, "hero-1", "effect_triggered"),
					healing("enemy-heal", 30, "enemy-1"),
					healing("full-health", 0),
					damageEntry("retaliation", 20, 0, false, "hero-1"),
				]}
			/>,
		);
		expect(screen.getByText("+15")).toBeInTheDocument();
		expect(screen.getByText("+4")).toBeInTheDocument();
		expect(screen.getByText("-20")).toBeInTheDocument();
		expect(screen.queryByText("+30")).not.toBeInTheDocument();
		expect(screen.queryByText("+0")).not.toBeInTheDocument();
	});
	afterEach(() => {
		vi.useRealTimers();
	});

	it("opens the combat log from the battlefield control", () => {
		const onOpenLog = vi.fn();
		render(<Battlefield {...baseProps} onOpenLog={onOpenLog} entries={[]} />);

		fireEvent.click(screen.getByRole("button", { name: "Open combat log" }));

		expect(onOpenLog).toHaveBeenCalledOnce();
	});

	it("shows compact mobile battle and gold multiplier badges", () => {
		render(<Battlefield {...baseProps} entries={[]} />);

		const battleInfo = screen.getByRole("group", {
			name: "Battle 12, gold multiplier 2 times",
		});

		expect(battleInfo).toHaveTextContent("Battle 12");
		expect(battleInfo).toHaveTextContent("Gold ×2");
	});

	it("ignores existing outcomes and shows all new enemy outcomes together", () => {
		vi.useFakeTimers();
		const existing = damageEntry("existing", 5);
		const { rerender } = render(<Battlefield {...baseProps} entries={[existing]} />);

		expect(screen.queryByText("5")).not.toBeInTheDocument();

		rerender(
			<Battlefield
				{...baseProps}
				entries={[existing, damageEntry("damage", 20, 3, true), missEntry("miss")]}
			/>,
		);

		expect(screen.getByText("CRIT")).toBeInTheDocument();
		expect(screen.getByText(/3 BLOCKED/)).toBeInTheDocument();
		expect(screen.getByText("20")).toBeInTheDocument();
		expect(screen.queryByText(/FIRE/)).not.toBeInTheDocument();
		expect(screen.getByText("MISSED")).toBeInTheDocument();

		act(() => vi.advanceTimersByTime(1_000));
		expect(screen.queryByText("MISSED")).not.toBeInTheDocument();
	});

	it("filters other targets and formats immune and fully blocked damage", () => {
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);

		rerender(
			<Battlefield
				{...baseProps}
				entries={[
					damageEntry("other", 50, 0, false, "enemy-2"),
					damageEntry("immune", 0, 0, false, "enemy-1", "immune"),
					damageEntry("blocked", 0, 5, false, "enemy-1", "normal", "effect_triggered"),
				]}
			/>,
		);

		expect(screen.queryByText("50")).not.toBeInTheDocument();
		expect(screen.getByText("IMMUNE (FIRE)")).toBeInTheDocument();
		expect(screen.getByText("0")).toBeInTheDocument();
		expect(screen.getByText(/5 BLOCKED/)).toBeInTheDocument();
	});

	it("groups damage by event type and damage type", () => {
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);
		const entries = [
			damageEntry("fire-1", 8, 2),
			damageEntry("fire-2", 7, 2, true),
			damageEntry("cold", 4, 0, false, "enemy-1", "normal", "damage_dealt", "cold"),
			damageEntry("fire-dot", 3, 0, false, "enemy-1", "normal", "effect_triggered"),
		];
		const original = structuredClone(entries);

		rerender(<Battlefield {...baseProps} entries={entries} />);

		expect(screen.getByText("15")).toBeInTheDocument();
		expect(screen.getByText("CRIT")).toBeInTheDocument();
		expect(screen.getByText(/4 BLOCKED/)).toBeInTheDocument();
		expect(screen.getByText("4")).toBeInTheDocument();
		expect(screen.getByText("3")).toBeInTheDocument();
		expect(screen.queryByText("8")).not.toBeInTheDocument();
		expect(entries).toEqual(original);
	});

	it("groups by recipient regardless of actor, with enemy outcomes first", () => {
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);
		rerender(
			<Battlefield
				{...baseProps}
				entries={[
					{ ...damageEntry("hero-self", 7, 0, false, "hero-1"), actor: "player" },
					{ ...damageEntry("enemy-self", 20), actor: "enemy" },
					damageEntry("hero-dot", 3, 0, false, "hero-1", "normal", "effect_triggered"),
				]}
			/>,
		);
		expect(screen.getAllByText(/^(20|-7|-3)$/).map((outcome) => outcome.textContent)).toEqual([
			"20",
			"-7",
			"-3",
		]);
	});

	it.each([
		{ targetId: "enemy-1", amount: "20", miss: "MISSED" },
		{ targetId: "hero-1", amount: "-20", miss: "EVADED" },
	])(
		"preserves outcome details for $targetId with direction indicated by sign and miss wording",
		({ targetId, amount, miss }) => {
			const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);
			rerender(
				<Battlefield
					{...baseProps}
					entries={[
						damageEntry("crit", 20, 3, true, targetId),
						damageEntry(
							"immune",
							0,
							0,
							false,
							targetId,
							"immune",
							"damage_dealt",
							"cold",
						),
						missEntry("miss", targetId),
					]}
				/>,
			);

			expect(screen.getByText(amount)).toBeInTheDocument();
			expect(screen.getByText("CRIT")).toBeInTheDocument();
			expect(screen.getByText(/3 BLOCKED/)).toBeInTheDocument();
			expect(screen.getByText("IMMUNE (COLD)")).toBeInTheDocument();
			expect(screen.getByText(miss)).toBeInTheDocument();
		},
	);

	it("replaces both directions on new actions and clears feedback when the encounter changes", () => {
		const first = [
			damageEntry("enemy-hit", 20),
			damageEntry("hero-hit", 8, 0, false, "hero-1"),
		];
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);
		rerender(<Battlefield {...baseProps} entries={first} />);
		expect(screen.getByText("-8")).toBeInTheDocument();
		rerender(<Battlefield {...baseProps} entries={[...first, damageEntry("next-hit", 10)]} />);
		expect(screen.queryByText("-8")).not.toBeInTheDocument();
		expect(screen.queryByText("20")).not.toBeInTheDocument();
		expect(screen.getByText("10")).toBeInTheDocument();
		rerender(<Battlefield {...baseProps} enemyId="enemy-2" entries={[]} />);
		expect(screen.queryByText("10")).not.toBeInTheDocument();
	});

	it("clears previous feedback when a new round has no supported outcomes", () => {
		const hit = damageEntry("hit", 20);
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);
		rerender(<Battlefield {...baseProps} entries={[hit]} />);
		rerender(
			<Battlefield
				{...baseProps}
				entries={[
					hit,
					{
						id: "skip",
						turnNumber: 2,
						actor: "player",
						eventType: "turn_skipped",
						message: "Turn skipped",
					},
				]}
			/>,
		);
		expect(screen.queryByText("20")).not.toBeInTheDocument();
	});

	it("restarts feedback when a new outcome arrives before the previous one expires", () => {
		vi.useFakeTimers();
		const { container, rerender } = render(<Battlefield {...baseProps} entries={[]} />);

		rerender(<Battlefield {...baseProps} entries={[damageEntry("first", 10)]} />);
		const firstOverlay = container.querySelector('div[aria-hidden="true"]');
		expect(firstOverlay).not.toBeNull();

		act(() => vi.advanceTimersByTime(500));
		rerender(
			<Battlefield
				{...baseProps}
				entries={[damageEntry("first", 10), damageEntry("second", 20)]}
			/>,
		);

		const secondOverlay = container.querySelector('div[aria-hidden="true"]');
		expect(secondOverlay).not.toBe(firstOverlay);
		expect(screen.getByText("20")).toBeInTheDocument();
	});
});

function damageEntry(
	id: string,
	hpDamage: number,
	absorbedDamage = 0,
	critical = false,
	targetId = "enemy-1",
	affinity: "normal" | "immune" = "normal",
	eventType: "damage_dealt" | "effect_triggered" = "damage_dealt",
	damageType: "fire" | "cold" = "fire",
): CombatLogEntry {
	return {
		id,
		turnNumber: 1,
		actor: "player",
		message: "Damage",
		eventType,
		outcome: {
			type: "damage",
			targetId,
			hpDamage,
			absorbedDamage,
			damageType,
			affinity,
			critical,
			halfDamageSave: false,
		},
	};
}

function missEntry(id: string, targetId = "enemy-1"): CombatLogEntry {
	return {
		id,
		turnNumber: 1,
		actor: "player",
		message: "Miss",
		eventType: "attack_missed",
		outcome: { type: "miss", targetId },
	};
}
