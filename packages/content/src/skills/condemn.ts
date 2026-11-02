import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "condemn",
	name: "Condemn",
	description:
		"Reduce the enemy's maximum HP by 75 and healing by 100% until the battle ends, each requiring a separate failed Constitution saving throw.",
	icon: "skills/unique/condemn.png",
	pool: "unique",
	kind: "spell",
	category: "debuff",
	rarity: "legendary",
	maxUses: 1,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "maxHpBonus",
			value: -75,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyHealing",
			target: "enemy",
			multiplier: 0,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
