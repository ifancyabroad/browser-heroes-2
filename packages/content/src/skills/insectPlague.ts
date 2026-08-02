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
	maxUses: 5,
	effects: [
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "piercing",
			dice: "2d6",
			durationTurns: 3,
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
