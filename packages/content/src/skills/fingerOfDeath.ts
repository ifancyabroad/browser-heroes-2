import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "finger_of_death",
	name: "Finger of Death",
	description: "Deal necrotic damage to the enemy.",
	icon: "skills/warlock/finger_of_death.png",
	pool: "warlock",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "6d10",
			attribute: "intelligence",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "intelligence" },
			},
		},
	],
	tags: [],
});
