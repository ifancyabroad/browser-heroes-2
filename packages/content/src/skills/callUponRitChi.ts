import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "call_upon_rit_chi",
	name: "Call Upon Rit Chi",
	description: "Invoke Rit Chi to grant overwhelming martial power and supernatural vitality.",
	icon: "skills/unique/call_upon_rit_chi.png",
	pool: "unique",
	kind: "prayer",
	category: "buff",
	rarity: "epic",
	maxUses: 1,
	effects: [
		{
			type: "modifyRoll",
			target: "self",
			roll: "attack",
			mode: "advantage",
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyDamage",
			target: "self",
			operation: "multiply",
			value: 1.5,
			duration: { unit: "battles", value: 1 },
		},
		{
			type: "modifyStat",
			target: "self",
			stat: "maxHpBonus",
			value: 20,
			duration: { unit: "battles", value: 1 },
		},
	],
	tags: [],
});
