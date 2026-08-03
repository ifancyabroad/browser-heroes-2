import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "drain_life",
	name: "Drain Life",
	description:
		"Unleash necrotic energy to damage your enemy while siphoning their life force to restore your own health.",
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
