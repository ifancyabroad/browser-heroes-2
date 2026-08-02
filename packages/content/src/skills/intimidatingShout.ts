import { buildSkill } from "../builders/buildSkill";

export default buildSkill({
	id: "intimidating_shout",
	name: "Intimidating Shout",
	description:
		"Release a fearsome bellow that shakes enemies, reducing their physical damage output.",
	icon: "skills/barbarian/intimidating_shout.png",
	pool: "barbarian",
	category: "debuff",
	maxUses: 4,
	effects: [
		{
			type: "modifyDamage",
			target: "enemy",
			damageType: "slashing",
			operation: "add",
			value: -50,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			damageType: "crushing",
			operation: "add",
			value: -50,
			durationTurns: 4,
		},
		{
			type: "modifyDamage",
			target: "enemy",
			damageType: "piercing",
			operation: "add",
			value: -50,
			durationTurns: 4,
		},
	],
	tags: [],
});
