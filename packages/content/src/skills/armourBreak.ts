import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "armour_break",
	name: "Armour Break",
	description:
		"Reduce the enemy's Armour Class on a failed Strength saving throw, then make a weapon attack.",
	icon: "skills/fighter/armour_break.png",
	pool: "fighter",
	kind: "weaponAttack",
	category: "debuff",
	rarity: "common",
	maxUses: 6,
	effects: [
		{
			type: "modifyStat",
			target: "enemy",
			stat: "armourClass",
			value: -4,
			duration: { unit: "turns", value: 3 },
			save: {
				attribute: "strength",
				onSuccess: "noEffect",
				dc: { attribute: "strength" },
			},
		},
		{
			type: "attackDamage",
			target: "enemy",
			multiplier: 1,
			attackRiders: [],
		},
	],
	tags: [],
});
