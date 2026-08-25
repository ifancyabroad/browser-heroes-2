import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cursing_bolt",
	name: "Cursing Bolt",
	description:
		"Fire a bolt of necrotic energy that deals damage and hinders the enemy's saving throws.",
	icon: "skills/warlock/cursing_bolt.png",
	pool: "warlock",
	kind: "spell",
	category: "debuff",
	rarity: "uncommon",
	maxUses: 4,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			attackRange: "ranged",
			dice: "2d8",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "wisdom",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			mode: "disadvantage",
			duration: { unit: "turns", value: 4 },
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
