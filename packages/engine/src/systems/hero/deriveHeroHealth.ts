import { calculateAttributeModifier } from "../../core/attributes";

export type DerivedHeroHealth = {
	currentHp: number;
	maxHp: number;
};

type DeriveHeroHealthInput = {
	baseConstitution: number;
	effectiveConstitution: number;
	level: number;
	currentHp: number;
	maxHp: number;
};

export function deriveHeroHealth(input: DeriveHeroHealthInput): DerivedHeroHealth {
	const baseModifier = calculateAttributeModifier(input.baseConstitution);

	const effectiveModifier = calculateAttributeModifier(input.effectiveConstitution);

	const constitutionHpBonus = (effectiveModifier - baseModifier) * input.level;

	const maxHp = Math.max(1, input.maxHp + constitutionHpBonus);

	return {
		maxHp,
		currentHp: Math.max(0, Math.min(input.currentHp, maxHp)),
	};
}
