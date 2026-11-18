import { createInitialRunState, type HeroView } from "@app/engine";
import type { FeatId } from "@app/content";
import type { RunView } from "@app/shared";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useGameModalStore } from "../../../stores/gameModalStore";
import { HeroSkillsModal } from "./HeroSkillsModal";

vi.mock("../../../components/Tooltip", () => ({
	Tooltip: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

function setup(skills: HeroView["skills"], featIds: FeatId[]) {
	const { state } = createInitialRunState({
		runId: "skills-modal-test",
		seed: "skills-modal-test",
		heroName: "Mira",
		classId: "warrior",
	});
	state.hero.skills = [...skills];
	state.hero.featIds = featIds;
	return render(<HeroSkillsModal run={{ id: state.id, state } as RunView} />);
}

describe("HeroSkillsModal", () => {
	beforeEach(() => useGameModalStore.setState({ modal: "skills" }));
	it("shows feats below skills", () => {
		setup([{ skillId: "heavy_strike", chargesRemaining: 1 }], ["commanding_presence"]);
		const skill = screen.getByText("Heavy Strike");
		const feats = screen.getByText("Feats");
		expect(skill.compareDocumentPosition(feats)).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
	});
	it("shows one empty message when there are no skills or feats", () => {
		setup([], []);
		expect(screen.getByText("No skills")).toBeInTheDocument();
		expect(screen.queryByText("Feats")).not.toBeInTheDocument();
	});
	it("labels feats when there are feats but no skills", () => {
		setup([], ["commanding_presence"]);
		expect(screen.getByText("Feats")).toBeInTheDocument();
		expect(screen.getByText("Commanding Presence")).toBeInTheDocument();
		expect(screen.queryByText("No skills")).not.toBeInTheDocument();
	});
});
