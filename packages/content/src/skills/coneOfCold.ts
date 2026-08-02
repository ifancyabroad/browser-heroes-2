import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cone_of_cold",
	name: "Cone of Cold",
	description: "Emit a frigid blast, freezing enemies in a wide cone.",
	icon: "skills/mage/cone_of_cold.png",
	pool: "mage",
	kind: "spell",
	category: "damage",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "cold",
			dice: "1d12+8",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "attackRollBonus",
			value: -2,
			durationTurns: 4,
		},
	],
	tags: [],
});
