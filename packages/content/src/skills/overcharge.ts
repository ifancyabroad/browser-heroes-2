import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overcharge",
	name: "Overcharge",
	description: "Release a dangerously concentrated surge of lightning and radiant power.",
	icon: "skills/unique/overcharge.png",
	pool: "unique",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "lightning",
			damageClass: "magical",
			dice: "6d8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
		{
			type: "damage",
			target: "enemy",
			damageType: "radiant",
			damageClass: "magical",
			dice: "6d8",
			requiresAttackRoll: false,
			save: {
				attribute: "constitution",
				onSuccess: "halfDamage",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
