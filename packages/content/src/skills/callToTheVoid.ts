import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "call_to_the_void",
	name: "Call to the Void",
	description: "Restore your HP immediately and over time.",
	icon: "skills/common/call_to_the_void.png",
	pool: "common",
	kind: "spell",
	category: "heal",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "heal",
			target: "self",
			dice: "6d6",
		},
		{
			type: "healOverTime",
			target: "self",
			dice: "4d6",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
