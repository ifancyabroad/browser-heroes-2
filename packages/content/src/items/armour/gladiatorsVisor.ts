import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gladiators_visor",
	name: "Gladiator's Visor",
	description: "Gladiator's Visor crafted to withstand the fiercest battles.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEQK4lqKJ7YcxpVgbR?alt=media&token=d7f24651-2e98-4d79-8a6c-3f3c6aab152e",
	price: 1620,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyStat",
			stat: "strength",
			operation: "add",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
