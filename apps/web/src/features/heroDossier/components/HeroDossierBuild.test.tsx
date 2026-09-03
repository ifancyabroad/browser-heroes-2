import type { HeroView } from "@app/engine";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AbilitiesSection } from "./HeroDossierBuild";

describe("AbilitiesSection", () => {
	it("omits feats when the hero has none", () => {
		const hero = { skills: [], featIds: [] } as unknown as HeroView;

		render(<AbilitiesSection hero={hero} />);

		expect(screen.getByRole("region", { name: "Skills" })).toBeInTheDocument();
		expect(screen.queryByRole("region", { name: "Feats" })).not.toBeInTheDocument();
		expect(screen.queryByText("No feats learned.")).not.toBeInTheDocument();
	});
});
