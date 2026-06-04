import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Shoot lightning from your fingers.",
	effects: [
		{
			damageType: "lightning",
			max: 8,
			min: 1,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh50tlZXmwsJcskPE8?alt=media&token=f0c44bf4-c4c5-4cf2-b8d5-30203a07ecc6",
	level: 1,
	maxUses: 12,
	name: "Sparks",
	price: 0,
	id: "sparks",
});
