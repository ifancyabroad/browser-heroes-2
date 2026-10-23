import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_roar",
	name: "Deafening Roar",
	description:
		"Give the enemy disadvantage on attack rolls and reduce their saving throw bonus, each requiring a separate failed Constitution saving throw.",
	icon: "skills/common/deafening_roar.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "epic",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "turns", value: 10 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "savingThrowBonus",
			value: -4,
			duration: { unit: "turns", value: 10 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
