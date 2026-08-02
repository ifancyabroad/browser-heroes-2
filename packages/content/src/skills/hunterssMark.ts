import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "hunterss_mark",
	name: "Hunters's Mark",
	icon: "skills/common/hunterss_mark.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	maxUses: 2,
	effects: [
		{
			type: "modifyStat",
			target: "self",
			stat: "attackRollBonus",
			value: 2,
			durationTurns: 4,
		},
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "piercing",
			durationTurns: 4,
		},
	],
	tags: [],
});
