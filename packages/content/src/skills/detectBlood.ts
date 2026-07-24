import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "detect_blood",
	name: "Detect Blood",
	icon: "skills/common/detect_blood.png",
	pool: "common",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "piercing",
			operation: "add",
			value: 20,
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 3,
		},
	],
	tags: [],
});
