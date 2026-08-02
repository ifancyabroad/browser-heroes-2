import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "summon_storm",
	name: "Summon Storm",
	icon: "skills/unique/summon_storm.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "10d8",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
