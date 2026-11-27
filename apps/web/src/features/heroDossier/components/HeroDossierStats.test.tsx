import { createInitialRunState, selectHeroView } from "@app/engine";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TooltipProvider } from "../../../components/Tooltip";
import { CombatSection } from "./HeroDossierStats";

function createHero() {
	const { state } = createInitialRunState({
		runId: "hp-tooltip",
		seed: "hp-tooltip",
		heroName: "Test Hero",
		classId: "warrior",
	});
	state.hero.level = 5;
	state.hero.maxHp = 50;
	return state.hero;
}

describe("dossier Max HP", () => {
	it("highlights direct HP bonuses and shows only their named sources in the tooltip", async () => {
		const hero = createHero();
		hero.featIds = ["jack_of_all_trades", "juggernaut"];
		render(
			<TooltipProvider>
				<CombatSection hero={selectHeroView(hero)} />
			</TooltipProvider>,
		);

		const row = screen.getByText("Max HP").closest("li")!;
		expect(within(row).getByText("80")).toHaveClass("text-success");
		fireEvent.focus(screen.getByText("Max HP").parentElement!);

		const tooltip = await screen.findByRole("tooltip");
		expect(tooltip).not.toHaveTextContent("Constitution");
		expect(tooltip).not.toHaveTextContent("Jack of All Trades");
		expect(tooltip).toHaveTextContent("Juggernaut+25");
	});

	it.each([false, true])(
		"keeps Constitution HP neutral with bonus Constitution: %s",
		async (bonus) => {
			const hero = createHero();
			if (bonus) {
				hero.featIds = ["jack_of_all_trades"];
			}
			render(
				<TooltipProvider>
					<CombatSection hero={selectHeroView(hero)} />
				</TooltipProvider>,
			);

			const row = screen.getByText("Max HP").closest("li")!;
			expect(within(row).getByText(bonus ? "55" : "50")).toHaveClass("text-text-bright");
			fireEvent.focus(screen.getByText("Max HP").parentElement!);
			expect(await screen.findByRole("tooltip")).not.toHaveTextContent("Constitution");
		},
	);

	it("keeps HP neutral with a zero Constitution modifier and no bonuses", () => {
		const hero = createHero();
		hero.attributes.constitution = 10;
		render(
			<TooltipProvider>
				<CombatSection hero={selectHeroView(hero)} />
			</TooltipProvider>,
		);

		const row = screen.getByText("Max HP").closest("li")!;
		expect(within(row).getByText("50")).toHaveClass("text-text-bright");
	});
});
