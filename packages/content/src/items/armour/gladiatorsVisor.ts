import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "gladiators_visor",
	name: "Gladiator's Visor",
	description: "Gladiator's Visor crafted to withstand the fiercest battles.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzEQK4lqKJ7YcxpVgbR?alt=media&token=d7f24651-2e98-4d79-8a6c-3f3c6aab152e",
	level: 4,
	price: 1620,
	armourType: "misc",
	properties: [
		{
			name: "slashing",
			type: "damage",
			value: 40,
		},
		{
			name: "crushing",
			type: "damage",
			value: 40,
		},
		{
			name: "piercing",
			type: "damage",
			value: 40,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
	],
	type: "helmet",
});
