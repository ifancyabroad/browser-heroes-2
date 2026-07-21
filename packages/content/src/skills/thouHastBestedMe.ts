import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "thou_hast_bested_me",
	name: "Thou Hast Bested Me",
	icon: "skills/unique/thou_hast_bested_me.png",
	pool: "unique",
	category: "spell",
	maxUses: 5,
	effects: [
		{
			type: "damage",
			target: "self",
			damageType: "radiant",
			dice: "5d6+3",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
