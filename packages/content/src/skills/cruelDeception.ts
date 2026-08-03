import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cruel_deception",
	name: "Cruel Deception",
	description:
		"Manipulate the enemy into holding back, potentially reducing their damage to a quarter.",
	icon: "skills/rogue/cruel_deception.png",
	pool: "rogue",
	kind: "technique",
	category: "debuff",
	rarity: "epic",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.25,
			durationTurns: 4,
			save: {
				attribute: "wisdom",
				onSuccess: "noEffect",
				dc: { attribute: "charisma" },
			},
		},
	],
	tags: [],
});
