import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Conjure a frost arrow.",
	effects: [
		{
			damageType: "cold",
			max: 10,
			min: 1,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nc3xGd_-Cawo2Zo0ipP?alt=media&token=4890dfe4-70f3-459d-b6f1-bce3c3ab7daf",
	level: 1,
	maxUses: 12,
	name: "Frost Arrow",
	price: 120,
	id: "frost_arrow",
});
