import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_hood",
	name: "Deathstalker Hood",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OD1bqrUJTE8odQKcULI?alt=media&token=ed8d231a-7b4d-4747-b162-1db8262f9e03",
	level: 4,
	price: 1700,
	armourType: "misc",
	properties: [
		{
			name: "charisma",
			type: "stat",
			value: -4,
		},
		{
			name: "poison",
			type: "damage",
			value: 40,
		},
		{
			name: "poison",
			type: "resistance",
			value: 40,
		},
		{
			name: "critChance",
			type: "auxiliaryStat",
			value: 2,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
	],
	characterClass: "-N_OzueqvUwAUNXnlWpb",
	type: "helmet",
});
