import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "blind",
	name: "Blind",
	description: "Envelop the enemy's sight in shadow, reliably hindering their attacks.",
	icon: "skills/warlock/blind.png",
	pool: "warlock",
	kind: "spell",
	category: "debuff",
	rarity: "common",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
