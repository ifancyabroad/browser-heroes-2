import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chain_lightning",
	name: "Chain Lightning",
	description:
		"Deal lightning damage to the enemy three times, with a separate saving throw for each.",
	icon: "skills/wizard/chain_lightning.png",
	pool: "wizard",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 3,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "2d10",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "2d10",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "dexterity",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "2d10",
			attribute: "intelligence",
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
