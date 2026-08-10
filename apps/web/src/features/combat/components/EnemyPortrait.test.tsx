import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { EnemyPortrait } from "./EnemyPortrait";

const baseProps = {
	enemyId: "enemy-1",
	currentHp: 10,
	portrait: "/orc.png",
	name: "Orc",
	isSlain: false,
};

describe("EnemyPortrait", () => {
	afterEach(() => {
		vi.useRealTimers();
	});

	it("reveals the portrait after it loads", () => {
		render(<EnemyPortrait {...baseProps} />);
		const portrait = screen.getByRole("img", { name: "Orc" });

		expect(portrait).toHaveClass("opacity-0");
		fireEvent.load(portrait);
		expect(portrait).toHaveClass("opacity-100");
	});

	it("applies temporary hit feedback when HP falls", () => {
		vi.useFakeTimers();
		const { rerender } = render(<EnemyPortrait {...baseProps} />);

		rerender(<EnemyPortrait {...baseProps} currentHp={7} />);
		const portrait = screen.getByRole("img", { name: "Orc" });
		expect(portrait.className).toContain("hit");

		act(() => vi.advanceTimersByTime(180));
		expect(portrait.className).not.toContain("hit");
	});

	it("resets feedback without animating when the enemy changes", () => {
		const { rerender } = render(<EnemyPortrait {...baseProps} currentHp={7} />);

		rerender(<EnemyPortrait {...baseProps} enemyId="enemy-2" currentHp={3} name="Goblin" />);

		expect(screen.getByRole("img", { name: "Goblin" }).className).not.toContain("hit");
	});
});
