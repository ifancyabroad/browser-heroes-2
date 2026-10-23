import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "cruel_deception",
	name: "Cruel Deception",
	description:
		"Make the enemy's next attack roll an automatic miss on a failed Wisdom saving throw. Your next two attack rolls become automatic critical hits before the effect expires.",
	icon: "skills/thief/cruel_deception.png",
	pool: "thief",
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
			duration: { unit: "turns", value: 4 },
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
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
