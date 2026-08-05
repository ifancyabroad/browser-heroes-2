import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_roar",
	name: "Deafening Roar",
	description: "Unleash a crippling roar that weakens and disorients nearby enemies.",
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
			duration: { unit: "battles", value: 1 },
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
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
