import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "breath_of_the_dawnflame",
	name: "Breath of the Dawnflame",
	icon: "skills/unique/breath_of_the_dawnflame.png",
	pool: "unique",
	category: "spell",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "3d12+16",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			dice: "3d12+16",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
