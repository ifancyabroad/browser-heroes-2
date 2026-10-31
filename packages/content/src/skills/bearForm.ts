import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "bear_form",
	name: "Bear Form",
	description:
		"Take on a bear's form, increasing your attack roll bonus and physical damage dealt and reducing physical damage taken for the current battle.",
	icon: "skills/unique/bear_form.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageClass: "physical",
			operation: "multiply",
			value: 2,
			duration: { unit: "turns", value: 5 },
		},
		{
			type: "modifyDamageTaken",
			target: "self",
			damageClass: "physical",
			operation: "multiply",
			value: 0.5,
			duration: { unit: "turns", value: 5 },
		},
	],
	tags: [],
});
