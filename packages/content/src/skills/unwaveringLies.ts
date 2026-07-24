import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "unwavering_lies",
	name: "Unwavering Lies",
	icon: "skills/unique/unwavering_lies.png",
	pool: "unique",
	category: "debuff",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamageAffinity",
			target: "enemy",
			affinity: "vulnerability",
			operation: "add",
			damageType: "necrotic",
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "saveDcBonus",
			value: -3,
			durationTurns: 3,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "savingThrowBonus",
			value: -3,
			durationTurns: 3,
		},
	],
	tags: [],
});
