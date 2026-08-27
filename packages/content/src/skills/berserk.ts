import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "berserk",
	name: "Berserk",
	description: "Become enraged, greatly increasing melee power but lowering defenses.",
	icon: "skills/common/berserk.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			attackRange: "melee",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "armourClass",
			value: -4,
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
