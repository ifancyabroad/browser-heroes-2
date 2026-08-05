import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "web",
	name: "Web",
	description:
		"Entangle the enemy in clinging webbing that hinders attacks and evasive movement.",
	icon: "skills/common/web.png",
	pool: "common",
	kind: "technique",
	category: "debuff",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "attack",
			mode: "disadvantage",
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
		{
			type: "modifyRoll",
			target: "enemy",
			roll: "savingThrow",
			attribute: "dexterity",
			mode: "disadvantage",
			duration: { unit: "battles", value: 1 },
			save: {
				attribute: "dexterity",
				onSuccess: "noEffect",
				dc: { attribute: "dexterity" },
			},
		},
	],
	tags: [],
});
