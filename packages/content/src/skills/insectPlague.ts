import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "insect_plague",
	name: "Insect Plague",
	description:
		"Engulf the enemy in a relentless swarm whose bites continue to tear at exposed flesh.",
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
