import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_energy",
	name: "Drain Energy",
	description:
		"Sap your enemy’s constitution to weaken them, while replenishing your own vitality.",
	icon: "skills/occultist/drain_energy.png",
	pool: "occultist",
	kind: "spell",
	category: "debuff",
	maxUses: 8,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "maxHpBonus",
			value: -6,
			durationTurns: 6,
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 6,
			durationTurns: 6,
		},
	],
	tags: [],
});
