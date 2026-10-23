import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_life",
	name: "Drain Life",
	description:
		"Deal necrotic damage to the enemy and restore your HP with a separate healing roll.",
	icon: "skills/occultist/drain_life.png",
	pool: "occultist",
	kind: "spell",
	category: "heal",
	rarity: "uncommon",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "necrotic",
			damageClass: "magical",
			dice: "3d6",
			attribute: "wisdom",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "wisdom" },
			},
		},
		{
			type: "heal",
			target: "self",
			dice: "3d6",
			attribute: "wisdom",
		},
	],
	tags: [],
});
