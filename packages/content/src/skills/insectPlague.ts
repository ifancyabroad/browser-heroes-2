import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "insect_plague",
	name: "Insect Plague",
	description:
		"Unleash a swarm of biting insects that deal piercing damage and erode enemy defenses.",
	icon: "skills/occultist/insect_plague.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	maxUses: 7,
	effects: [
		{
			type: "damage",
			target: "enemy",
			damageType: "piercing",
			dice: "1d10+5",
			attribute: "wisdom",
			requiresAttackRoll: false,
		},
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -4,
			durationTurns: 4,
		},
	],
	tags: [],
});
