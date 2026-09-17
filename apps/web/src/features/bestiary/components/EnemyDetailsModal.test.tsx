import { fireEvent, render, screen } from "@testing-library/react";
import { enemies, feats, skills, type Enemy } from "@app/content";
import { describe, expect, it, vi } from "vitest";
import { EnemyDetailsModal } from "./EnemyDetailsModal";

const record = { enemyId: enemies[0].id, encounters: 3, victories: 2, deaths: 1 };
describe("EnemyDetailsModal", () => {
	it("hides empty sections and uses the matching zone background", () => {
		const enemy: Enemy = structuredClone(enemies[0]);
		enemy.encounter.zone = "forest";
		enemy.combat.skillIds = [];
		enemy.combat.featIds = [];
		enemy.combat.damageAffinities = { resistances: [], immunities: [], vulnerabilities: [] };
		const close = vi.fn();
		render(<EnemyDetailsModal enemy={enemy} record={record} onClose={close} />);
		expect(screen.queryByRole("heading", { name: "Skills" })).not.toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: "Feats" })).not.toBeInTheDocument();
		expect(screen.queryByRole("heading", { name: "Affinities" })).not.toBeInTheDocument();
		expect(screen.getByRole("img").parentElement?.style.backgroundImage).toContain("bg_12.png");
		fireEvent.keyDown(screen.getByRole("dialog"), { key: "Escape" });
		expect(close).toHaveBeenCalled();
	});
	it("shows authored skill and feat descriptions and populated affinities", () => {
		const enemy = structuredClone(enemies[0]);
		enemy.combat.skillIds = [skills[0].id];
		enemy.combat.featIds = [feats[0].id];
		enemy.combat.damageAffinities.resistances = ["fire"];
		render(<EnemyDetailsModal enemy={enemy} record={record} onClose={vi.fn()} />);
		expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: feats[0].name })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Affinities" })).toBeInTheDocument();
	});
});
