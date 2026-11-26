import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import App from "./App";
import { catalogs } from "./content/catalog";
import { DetailSectionView } from "./components/DetailSections";

const sectionByCategory = {
	enemies: "Combat profile",
	skills: "Effects",
	feats: "Attack riders",
	classes: "Class profile",
	"system-ghosts": "Equipment recipes",
	"item-bases": "Additional properties",
	affixes: "Applies to",
	items: "Passive modifiers",
	consumables: "Effects",
	achievements: "Unlock requirement",
};

describe("category detail layouts", () => {
	it.each(catalogs)("renders a tailored $label page with complete registry access", (catalog) => {
		const entry = [...catalog.entries].sort(
			(a, b) => JSON.stringify(b.definition).length - JSON.stringify(a.definition).length,
		)[0]!;
		render(
			<MemoryRouter initialEntries={[`/${catalog.key}/${entry.id}`]}>
				<App />
			</MemoryRouter>,
		);
		expect(screen.getByRole("heading", { name: entry.name })).toBeInTheDocument();
		// Item bases may be entirely described by their compact header.
		if (catalog.key !== "item-bases") {
			expect(
				screen.getByRole("heading", { name: sectionByCategory[catalog.key] }),
			).toBeInTheDocument();
		}
		expect(screen.queryByRole("heading", { name: "Overview" })).not.toBeInTheDocument();
		if (catalog.key === "enemies" || catalog.key === "classes") {
			const profile = document.querySelector(".section-profile")!;
			expect(profile.querySelectorAll(".attribute-strip dd")).toHaveLength(6);
			expect(document.querySelector(".category-section#attributes")).toBeNull();
		}
		for (const link of screen
			.getByRole("navigation", { name: "Entry sections" })
			.querySelectorAll("a")) {
			expect(document.getElementById(link.hash.slice(1))).not.toBeNull();
		}
		const registry = document.getElementById("registry")!;
		fireEvent.click(registry.querySelector("summary")!);
		expect(registry).toHaveAttribute("open");
		expect(JSON.parse(registry.querySelector("pre")!.textContent!)).toEqual(entry.definition);
	});

	it("expresses alternative applicability groups without combining their criteria", () => {
		render(
			<DetailSectionView
				section={{
					id: "applicability",
					title: "Applies to",
					kind: "applicability",
					rules: [
						{ itemTypes: ["weapon"], damageTypes: ["fire", "cold"] },
						{ itemTypes: ["armour"], armourSlots: ["body"] },
					],
				}}
			/>,
		);
		expect(screen.getByText("Match any one of these groups.")).toBeInTheDocument();
		expect(screen.getAllByText("Match all criteria in this group.")).toHaveLength(2);
		expect(screen.getByText("Fire or Cold")).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Group 1" })).toBeInTheDocument();
		expect(screen.getByRole("heading", { name: "Group 2" })).toBeInTheDocument();
	});
});
