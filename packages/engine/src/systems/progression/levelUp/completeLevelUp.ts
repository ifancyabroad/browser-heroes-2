import { SKILLS_BY_ID, type SkillId } from "@app/content";

import { failureResult, successResult } from "../../../core/result";
import type {
	CompleteLevelUpAction,
	EngineEvent,
	EngineResult,
	HeroSkillState,
	HeroState,
	LevelUpOption,
	PendingLevelUp,
	RunState,
} from "../../../schemas";
import { createPendingLevelUp } from "./createPendingLevelUp";
import { createPlayerCombatant } from "../../combat/combatants/createPlayerCombatant";

export function completeLevelUp(state: RunState, action: CompleteLevelUpAction): EngineResult {
	const pendingLevelUp = state.hero.pendingLevelUp;

	if (!pendingLevelUp) {
		return failureResult(state, "LEVEL_UP_NOT_AVAILABLE");
	}

	const selectedOption = findSelectedOption(pendingLevelUp.options, action.selection);

	if (pendingLevelUp.options.length > 0 && !selectedOption) {
		return failureResult(state, "INVALID_LEVEL_UP_SELECTION");
	}

	if (pendingLevelUp.options.length === 0 && action.selection !== null) {
		return failureResult(state, "INVALID_LEVEL_UP_SELECTION");
	}

	const updatedHero = applyLevelUpToHero(state.hero, pendingLevelUp, selectedOption);

	const nextPendingLevelUp = createPendingLevelUp(updatedHero, state.rngState);

	const finalHero: HeroState = {
		...updatedHero,
		pendingLevelUp: nextPendingLevelUp.value,
	};

	return successResult(
		{
			...state,
			rngState: nextPendingLevelUp.rngState,
			hero: finalHero,
			combat: refreshCompletedCombatPlayer(state.combat, finalHero),
		},
		[
			{
				type: "LEVEL_UP_COMPLETED",
				level: pendingLevelUp.level,
				hpGain: pendingLevelUp.hpGain,
				newMaxHp: finalHero.maxHp,
				selection: createCompletedSelection(selectedOption),
			},
		],
	);
}

function findSelectedOption(
	options: readonly LevelUpOption[],
	selection: CompleteLevelUpAction["selection"],
): LevelUpOption | null {
	if (!selection) {
		return null;
	}

	return (
		options.find((option) => {
			if (option.type === "skill" && selection.type === "skill") {
				return option.skillId === selection.skillId;
			}

			if (option.type === "feat" && selection.type === "feat") {
				return option.featId === selection.featId;
			}

			return false;
		}) ?? null
	);
}

function applySkillOption(
	hero: HeroState,
	option: Extract<LevelUpOption, { type: "skill" }>,
): HeroState {
	const existingSkillIndex = hero.skills.findIndex((skill) => skill.skillId === option.skillId);

	if (existingSkillIndex === -1) {
		return {
			...hero,
			skills: [...hero.skills, createNewSkillState(option.skillId)],
		};
	}

	return {
		...hero,
		skills: hero.skills.map((skill, index) =>
			index === existingSkillIndex
				? {
						...skill,
						rank: option.resultingRank,
					}
				: skill,
		),
	};
}

function createNewSkillState(skillId: SkillId): HeroSkillState {
	const skillDefinition = SKILLS_BY_ID[skillId];

	return {
		skillId,
		rank: 1,
		...(skillDefinition.maxUses
			? {
					chargesRemaining: skillDefinition.maxUses,
				}
			: {}),
	};
}

function applyLevelUpToHero(
	hero: HeroState,
	pendingLevelUp: PendingLevelUp,
	selectedOption: LevelUpOption | null,
): HeroState {
	const newMaxHp = hero.maxHp + pendingLevelUp.hpGain;

	let updatedHero: HeroState = {
		...hero,
		level: pendingLevelUp.level,
		maxHp: newMaxHp,
		currentHp: newMaxHp,
		pendingLevelUp: null,
	};

	if (selectedOption?.type === "skill") {
		updatedHero = applySkillOption(updatedHero, selectedOption);
	}

	if (selectedOption?.type === "feat") {
		updatedHero = {
			...updatedHero,
			featIds: [...updatedHero.featIds, selectedOption.featId],
		};
	}

	return updatedHero;
}

type CompletedLevelUpSelection = Extract<EngineEvent, { type: "LEVEL_UP_COMPLETED" }>["selection"];

function createCompletedSelection(option: LevelUpOption | null): CompletedLevelUpSelection {
	if (!option) {
		return null;
	}

	if (option.type === "skill") {
		return {
			type: "skill",
			skillId: option.skillId,
			resultingRank: option.resultingRank,
		};
	}

	return {
		type: "feat",
		featId: option.featId,
	};
}

function refreshCompletedCombatPlayer(
	combat: RunState["combat"],
	hero: HeroState,
): RunState["combat"] {
	if (!combat || combat.status === "player_won") {
		return combat;
	}

	return {
		...combat,
		player: createPlayerCombatant(hero, combat.id),
	};
}
