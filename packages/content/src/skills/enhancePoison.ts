import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "enhance_poison",
	name: "Enhance Poison",
	description:
		"Amplify the potency of your poison, causing it to inflict greater, lingering damage.",
	icon: "skills/assassin/enhance_poison.png",
	pool: "assassin",
	category: "buff",
	maxUses: 6,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "poison",
			operation: "add",
			value: 50,
			durationTurns: 8,
		},
	],
	tags: [],
});
