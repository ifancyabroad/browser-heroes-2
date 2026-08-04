import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cruel_deception",
	name: "Cruel Deception",
	description:
		"Lure the enemy into striking at a false opening while preparing two devastating counterattacks.",
	icon: "skills/rogue/cruel_deception.png",
	pool: "rogue",
	kind: "technique",
	category: "debuff",
	rarity: "legendary",
	maxUses: 2,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "automaticFailure",
			charges: 1,
			durationTurns: 4,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "automaticCritical",
			charges: 2,
			durationTurns: 4,
		},
	],
	tags: [],
});
