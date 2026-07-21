import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cruel_deception",
	name: "Cruel Deception",
	description:
		"Manipulate your foe with deceptive tactics, charming them into possibly turning their attacks on themselves.",
	icon: "skills/rogue/cruel_deception.png",
	pool: "rogue",
	category: "debuff",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.75,
			durationTurns: 4,
		},
	],
	tags: [],
});
