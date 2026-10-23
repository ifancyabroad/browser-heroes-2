import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "insect_plague",
	name: "Insect Plague",
	description: "Deal piercing damage over time to the enemy on a failed Dexterity saving throw.",
	icon: "skills/occultist/insect_plague.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	rarity: "rare",
	maxUses: 5,
	effects: [
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "piercing",
			damageClass: "magical",
			dice: "4d6",
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
