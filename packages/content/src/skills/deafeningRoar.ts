import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_roar",
	name: "Deafening Roar",
	description: "Unleash a crippling roar that weakens and disorients nearby enemies.",
	icon: "skills/common/deafening_roar.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	maxUses: 3,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			durationTurns: 4,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "saveDcBonus",
			value: -3,
			durationTurns: 4,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
