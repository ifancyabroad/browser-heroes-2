import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "consume",
	name: "Consume",
	description: "Deal acid damage over time to the enemy on a failed Constitution saving throw.",
	icon: "skills/unique/consume.png",
	pool: "unique",
	kind: "technique",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "acid",
			damageClass: "other",
			dice: "4d8",
			duration: { unit: "turns", value: 4 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "constitution" },
			},
		},
	],
	tags: [],
});
