import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overcharge",
	name: "Overcharge",
	icon: "skills/unique/overcharge.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "2d12+8",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			dice: "2d12+8",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
