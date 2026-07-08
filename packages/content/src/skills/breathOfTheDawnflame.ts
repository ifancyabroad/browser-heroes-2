import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "breath_of_the_dawnflame",
	name: "Breath of the Dawnflame",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-OCKA2eOBOjwhJeBr4Ou?alt=media&token=1ab19e49-6f25-4374-82a7-4d650e715788",
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
