import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "yagamons_revenge",
	name: "Yagamon's Revenge",
	icon: "skills/unique/yagamons_revenge.png",
	pool: "unique",
	kind: "spell",
	category: "buff",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			damageType: "crushing",
			operation: "add",
			value: 50,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "self",
			damageType: "fire",
			operation: "add",
			value: 50,
			durationTurns: 4,
		},
	],
	tags: [],
});
