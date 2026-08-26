import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import { catalogByKey } from "./content/catalog";

const sampleSkill = catalogByKey.skills.entries[0]!;
const sampleEnemy = catalogByKey.enemies.entries.find(
	(entry) =>
		"combat" in entry.definition &&
		"portrait" in entry.definition &&
		entry.definition.combat.skillIds.length > 0,
)!;

if (!("combat" in sampleEnemy.definition) || !("portrait" in sampleEnemy.definition)) {
	throw new Error("Expected an enemy with a skill and portrait");
}

const sampleEnemyDefinition = sampleEnemy.definition;
const sampleEnemySkill = catalogByKey.skills.entries.find(
	(entry) => entry.id === sampleEnemyDefinition.combat.skillIds[0],
)!;

describe("content studio routes", () => {
	it("renders a filterable category table and switches to image mode", () => {
		render(
			<MemoryRouter initialEntries={[`/skills?q=${sampleSkill.id}`]}>
				<App />
			</MemoryRouter>,
		);
		expect(screen.getByRole("heading", { name: "Skills" })).toBeInTheDocument();
		expect(screen.getAllByRole("link", { name: sampleSkill.name }).length).toBeGreaterThan(0);
		fireEvent.click(screen.getByRole("button", { name: "Images" }));
		expect(screen.getByText(sampleSkill.id)).toBeInTheDocument();
	});

	it("reports the visible page range rather than implying all entries are displayed", () => {
		render(
			<MemoryRouter initialEntries={["/skills"]}>
				<App />
			</MemoryRouter>,
		);
		expect(screen.getByText(/^Showing 1–30 of \d+ entries$/)).toBeInTheDocument();
		fireEvent.click(screen.getByRole("button", { name: "Next" }));
		expect(screen.getByText(/^Showing 31–60 of \d+ entries$/)).toBeInTheDocument();
	});

	it("renders details, complete artwork paths, and references", () => {
		render(
			<MemoryRouter initialEntries={[`/enemies/${sampleEnemy.id}`]}>
				<App />
			</MemoryRouter>,
		);
		expect(screen.getByRole("heading", { name: sampleEnemy.name })).toBeInTheDocument();
		expect(screen.getByText(sampleEnemyDefinition.portrait)).toBeInTheDocument();
		expect(
			screen.getByRole("link", { name: new RegExp(sampleEnemySkill.name, "i") }),
		).toHaveAttribute("href", `/skills/${sampleEnemySkill.id}`);
		expect(screen.queryByRole("link", { name: "Edit" })).not.toBeInTheDocument();
	});

	it("preserves list state in the detail back link", () => {
		render(
			<MemoryRouter initialEntries={[`/enemies?q=${sampleEnemy.id}`]}>
				<App />
			</MemoryRouter>,
		);
		fireEvent.click(screen.getAllByRole("link", { name: sampleEnemy.name })[0]!);
		expect(screen.getByRole("link", { name: /Back to Enemies/ })).toHaveAttribute(
			"href",
			`/enemies?q=${sampleEnemy.id}`,
		);
	});

	it("shows a useful message for an unknown registry id", () => {
		render(
			<MemoryRouter initialEntries={["/skills/not_real"]}>
				<App />
			</MemoryRouter>,
		);
		expect(screen.getByRole("heading", { name: "Skill not found" })).toBeInTheDocument();
	});
});
