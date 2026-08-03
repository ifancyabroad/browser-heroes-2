import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "contagion",
	name: "Contagion",
	description:
		"Infect the enemy with a virulent poison that ravages them over an extended period.",
	icon: "skills/occultist/contagion.png",
	pool: "occultist",
	kind: "spell",
	category: "damage",
	maxUses: 2,
	effects: [
		{
			type: "damageOverTime",
			target: "enemy",
			damageType: "poison",
			dice: "3d6",
			durationTurns: 5,
			save: {
				attribute: "constitution",
				onSuccess: "noEffect",
				dc: { attribute: "wisdom" },
			},
		},
	],
	tags: [],
});
