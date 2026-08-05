import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "disarm",
	name: "Disarm",
	description: "Attempt to knock the enemy's weapon aside and sharply reduce their damage.",
	icon: "skills/common/disarm.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "rare",
	maxUses: 2,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			operation: "multiply",
			value: 0.25,
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
	],
	tags: [],
});
