import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "dragon_breath",
	name: "Dragon Breath",
	description: "Unleash a catastrophic cone of flame that devastates the enemy in an instant.",
	icon: "skills/warlock/dragon_breath.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "fire",
			damageClass: "magical",
			dice: "10d6",
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
