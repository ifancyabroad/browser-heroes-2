import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "overclock",
	name: "Overclock",
	description:
		"Increase all damage you deal by 100% and gain advantage on attack rolls, but take lightning damage over time.",
	icon: "skills/common/overclock.png",
	pool: "common",
	kind: "technique",
	category: "buff",
	rarity: "rare",
	maxUses: 1,
	effects: [
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 2,
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			duration: { unit: "turns", value: 4 },
		},
		{
			type: "damageOverTime",
			target: "self",
			damageType: "lightning",
			damageClass: "magical",
			dice: "1d6",
			duration: { unit: "turns", value: 4 },
		},
	],
	tags: [],
});
