import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "chain_lightning",
	name: "Chain Lightning",
	description: "Release cascading lightning that repeatedly tears through the target.",
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
			dice: "2d6",
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
			dice: "2d6",
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
