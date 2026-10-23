import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "contagion",
	name: "Contagion",
	description: "Deal poison damage over time to the enemy on a failed Constitution saving throw.",
	icon: "skills/occultist/contagion.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "poison",
			damageClass: "magical",
			dice: "4d4",
			duration: { unit: "turns", value: 5 },
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
