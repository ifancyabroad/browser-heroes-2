import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chain_lightning",
	name: "Chain Lightning",
	description: "Summon cascading thunder, chaining electrical strikes across enemies.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Fskills%2F-Nhh6cp8cTNG_6h4WvSN?alt=media&token=f9448ffc-e20a-4c5b-8ccc-a19020ea2999",
	pool: "mage",
	category: "spell",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "1d8+3",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "1d8+3",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "1d8+3",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
