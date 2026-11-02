import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "rallying_cry",
	name: "Rallying Cry",
	description:
		"Restore your HP, reduce all damage you take, and gain advantage on saving throws.",
	icon: "skills/common/rallying_cry.png",
	pool: "common",
	kind: "technique",
	category: "defensive",
	rarity: "rare",
	maxUses: 3,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "3d8",
			attribute: "constitution",
		},
		{
			type: "modifyDamageTaken",
			target: "self",
			operation: "multiply",
			value: 0.75,
			duration: { unit: "turns", value: 10 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "savingThrow",
			mode: "advantage",
			duration: { unit: "turns", value: 10 },
		},
	],
	tags: [],
});
