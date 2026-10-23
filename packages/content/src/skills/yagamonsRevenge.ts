import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "yagamons_revenge",
	name: "Yagamon's Revenge",
	description: "Increase your crushing and fire damage dealt for the current battle.",
	icon: "skills/unique/yagamons_revenge.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
