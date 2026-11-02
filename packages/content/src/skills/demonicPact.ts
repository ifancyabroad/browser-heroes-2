import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "demonic_pact",
	name: "Demonic Pact",
	description:
		"Make your attack rolls automatic critical hits and increase your critical hit damage dice multiplier by 2, but take slashing damage over time for 3 turns.",
	icon: "skills/common/demonic_pact.png",
	pool: "common",
	kind: "spell",
	category: "buff",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "automaticCritical",
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "criticalDiceMultiplierBonus",
			value: 2,
			duration: { unit: "turns", value: 3 },
		},
		{
			type: "damageOverTime",
			target: "self",
			damageType: "slashing",
			damageClass: "physical",
			dice: "2d6",
			duration: { unit: "turns", value: 3 },
		},
	],
	tags: [],
});
