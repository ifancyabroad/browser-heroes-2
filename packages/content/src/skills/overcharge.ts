import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overcharge",
	name: "Overcharge",
	description: "Release a dangerously concentrated surge of elemental lightning.",
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
			dice: "10d8",
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
