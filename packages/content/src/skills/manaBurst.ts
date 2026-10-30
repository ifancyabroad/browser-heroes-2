import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "mana_burst",
	name: "Mana Burst",
	description: "Deal lightning damage to yourself and the enemy.",
	icon: "skills/unique/mana_burst.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "self",
			damageType: "lightning",
			damageClass: "magical",
			dice: "2d8",
			requiresAttackRoll: false,
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			dice: "8d8",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
