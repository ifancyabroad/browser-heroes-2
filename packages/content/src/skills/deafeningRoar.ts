import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "deafening_roar",
	name: "Deafening Roar",
	description: "Unleash a crippling roar that weakens and disorients nearby enemies.",
	icon: "skills/common/deafening_roar.png",
	pool: "common",
	category: "debuff",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			value: -3,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "add",
			value: -3,
			durationTurns: 4,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "saveDcBonus",
			value: -3,
			durationTurns: 4,
		},
	],
	tags: [],
});
