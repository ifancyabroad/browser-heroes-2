import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("../../../components/Tooltip", () => ({
	Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

import { HeroSkillsTab } from "./HeroSkillsTab";

describe("HeroSkillsTab", () => {
	it("shows feats below skills when the hero has feats", () => {
		render(
			<HeroSkillsTab
				skills={[{ skillId: "heavy_strike", chargesRemaining: 1 }]}
				featIds={["commanding_presence"]}
			/>,
		);

		const skills = screen.getByText("Heavy Strike");
		const feats = screen.getByText("Feats");
		expect(screen.queryByText("Skills")).not.toBeInTheDocument();
		expect(skills.compareDocumentPosition(feats)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
	});

	it("shows one empty message when the hero has no skills or feats", () => {
		render(<HeroSkillsTab skills={[]} featIds={[]} />);

		expect(screen.getByText("No skills")).toBeInTheDocument();
		expect(screen.queryByText("Skills")).not.toBeInTheDocument();
		expect(screen.queryByText("Feats")).not.toBeInTheDocument();
	});

	it("labels feats when the hero has feats but no skills", () => {
		render(<HeroSkillsTab skills={[]} featIds={["commanding_presence"]} />);

		expect(screen.getByText("Feats")).toBeInTheDocument();
		expect(screen.getByText("Commanding Presence")).toBeInTheDocument();
		expect(screen.queryByText("No skills")).not.toBeInTheDocument();
	});
});
