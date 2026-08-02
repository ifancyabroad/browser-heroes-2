import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "combust",
	name: "Combust",
	description: "Overheat and erupt into flames burning all those around you.",
	icon: "skills/unique/combust.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	maxUses: 1,
	effects: [
		{
			type: "damage",
			target: "self",
			damageType: "fire",
			dice: "15d12",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			dice: "4d12+19",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
