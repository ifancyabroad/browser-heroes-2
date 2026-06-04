import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	class: "mage",
	description: "Summon cascading thunder, chaining electrical strikes across enemies.",
	effects: [
		{
			damageType: "lightning",
			max: 10,
			min: 4,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "lightning",
			max: 10,
			min: 4,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
		{
			damageType: "lightning",
			max: 10,
			min: 4,
			modifier: "intelligence",
			target: "enemy",
			type: "damage",
		},
	],
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh6cp8cTNG_6h4WvSN?alt=media&token=f9448ffc-e20a-4c5b-8ccc-a19020ea2999",
	level: 4,
	maxUses: 3,
	name: "Chain Lightning",
	price: 0,
	id: "chain_lightning",
});
