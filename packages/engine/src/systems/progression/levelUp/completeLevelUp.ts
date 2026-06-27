import { SKILLS_BY_ID, type SkillId } from "@app/content";

import { failureResult, successResult } from "../../../core/result";
import type {
	CompleteLevelUpAction,
	EngineResult,
	HeroSkillState,
	HeroState,
	LevelUpOption,
	RunState,
} from "../../../schemas";
import { createPendingLevelUp } from "./createPendingLevelUp";

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

	const completedLevel = pendingLevelUp.level;
	const hpGain = pendingLevelUp.hpGain;
	const newMaxHp = state.hero.maxHp + hpGain;

	let updatedHero: HeroState = {
		...state.hero,
		level: completedLevel,
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

	const completedSelection =
		selectedOption?.type === "skill"
			? {
					type: "skill" as const,
					skillId: selectedOption.skillId,
					resultingRank: selectedOption.resultingRank,
				}
			: selectedOption?.type === "feat"
				? {
						type: "feat" as const,
						featId: selectedOption.featId,
					}
				: null;

	const nextPendingLevelUp = createPendingLevelUp(updatedHero, state.rngState);

	return successResult(
		{
			...state,
			rngState: nextPendingLevelUp.rngState,
			hero: {
				...updatedHero,
				pendingLevelUp: nextPendingLevelUp.value,
			},
		},
		[
			{
				type: "LEVEL_UP_COMPLETED",
				level: completedLevel,
				hpGain,
				newMaxHp,
				selection: completedSelection,
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
