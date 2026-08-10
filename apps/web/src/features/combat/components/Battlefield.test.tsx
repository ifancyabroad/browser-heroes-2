import { act, render, screen } from "@testing-library/react";
import type { CombatLogEntry } from "@app/engine";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Battlefield } from "./Battlefield";

const baseProps = {
	enemyId: "enemy-1",
	enemyCurrentHp: 100,
	enemyPortrait: null,
	enemyName: "Orc",
	isEnemySlain: false,
	nextZone: "forest" as const,
	zone: "forest" as const,
};

describe("Battlefield combat outcomes", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("ignores existing outcomes and shows all new enemy outcomes together", () => {
		vi.useFakeTimers();
		const existing = damageEntry("existing", 5);
		const { rerender } = render(<Battlefield {...baseProps} entries={[existing]} />);

		expect(screen.queryByText(/-5 FIRE/)).not.toBeInTheDocument();

		rerender(
			<Battlefield
				{...baseProps}
				entries={[existing, damageEntry("damage", 20, 3, true), missEntry("miss")]}
			/>,
		);

		expect(screen.getByText("CRIT")).toHaveClass("text-legendary");
		expect(screen.getByText(/3 BLOCKED/)).toBeInTheDocument();
		expect(screen.getByText(/-20 FIRE/)).toHaveClass("text-damage-fire");
		expect(screen.getByText("MISS")).toHaveClass("text-error");

		act(() => vi.advanceTimersByTime(1_000));
		expect(screen.queryByText("MISS")).not.toBeInTheDocument();
	});

	it("filters other targets and formats immune and fully blocked damage", () => {
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);

		rerender(
			<Battlefield
				{...baseProps}
				entries={[
					damageEntry("other", 50, 0, false, "enemy-2"),
					damageEntry("immune", 0, 0, false, "enemy-1", "immune"),
					damageEntry("blocked", 0, 5),
				]}
			/>,
		);

		expect(screen.queryByText(/-50 FIRE/)).not.toBeInTheDocument();
		expect(screen.getByText("IMMUNE: FIRE")).toBeInTheDocument();
		expect(screen.getByText(/0 FIRE/)).toBeInTheDocument();
		expect(screen.getByText(/5 BLOCKED/)).toBeInTheDocument();
	});

	it("uses logarithmic font-size steps based on HP damage", () => {
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);

		rerender(
			<Battlefield
				{...baseProps}
				entries={[damageEntry("small", 10), damageEntry("large", 40)]}
			/>,
		);

		expect(screen.getByText(/-10 FIRE/)).toHaveStyle({ fontSize: "1rem" });
		expect(screen.getByText(/-40 FIRE/)).toHaveStyle({ fontSize: "1.25rem" });
	});

	it("groups damage by event type and damage type", () => {
		const { rerender } = render(<Battlefield {...baseProps} entries={[]} />);

		rerender(
			<Battlefield
				{...baseProps}
				entries={[
					damageEntry("fire-1", 8),
					damageEntry("fire-2", 7),
					damageEntry("cold", 4, 0, false, "enemy-1", "normal", "damage_dealt", "cold"),
					damageEntry("fire-dot", 3, 0, false, "enemy-1", "normal", "effect_triggered"),
				]}
			/>,
		);

		expect(screen.getByText(/-15 FIRE/)).toBeInTheDocument();
		expect(screen.getByText(/-4 COLD/)).toBeInTheDocument();
		expect(screen.getByText(/-3 FIRE/)).toBeInTheDocument();
		expect(screen.queryByText(/-8 FIRE/)).not.toBeInTheDocument();
	});

	it("restarts feedback when a new outcome arrives before the previous one expires", () => {
		vi.useFakeTimers();
		const { container, rerender } = render(<Battlefield {...baseProps} entries={[]} />);

		rerender(<Battlefield {...baseProps} entries={[damageEntry("first", 10)]} />);
		const firstOverlay = container.querySelector('[aria-hidden="true"]');
		expect(firstOverlay).not.toBeNull();

		act(() => vi.advanceTimersByTime(500));
		rerender(
			<Battlefield
				{...baseProps}
				entries={[damageEntry("first", 10), damageEntry("second", 20)]}
			/>,
		);

		const secondOverlay = container.querySelector('[aria-hidden="true"]');
		expect(secondOverlay).not.toBe(firstOverlay);
		expect(screen.getByText(/-20 FIRE/)).toBeInTheDocument();
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

function missEntry(id: string): CombatLogEntry {
	return {
		id,
		turnNumber: 1,
		actor: "player",
		message: "Miss",
		eventType: "attack_missed",
		outcome: { type: "miss", targetId: "enemy-1" },
	};
}
