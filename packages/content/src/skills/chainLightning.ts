import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chain_lightning",
	name: "Chain Lightning",
	description: "Summon cascading thunder, chaining electrical strikes across enemies.",
	icon: "skills/mage/chain_lightning.png",
	pool: "mage",
	kind: "spell",
	category: "damage",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "2d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "2d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			dice: "2d6",
			attribute: "intelligence",
			requiresAttackRoll: false,
		},
	],
	tags: [],
});
