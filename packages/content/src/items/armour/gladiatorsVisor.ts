import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gladiators_visor",
	name: "Gladiator's Visor",
	description: "Gladiator's Visor crafted to withstand the fiercest battles.",
	icon: "items/armour/helms/Helm_25_gladiator.png",
	price: 1620,
	rarity: "legendary",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyDamage",
			damageType: "piercing",
			operation: "add",
			value: 5,
		},
		{
			type: "modifyStat",
			stat: "strength",
			value: 2,
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			value: 1,
		},
	],
	tags: [],
});
