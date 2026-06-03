import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "deathstalker_belt",
	name: "Deathstalker Belt",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9ewWW6AAZOa6anIU5?alt=media&token=300d631c-e308-4df3-a835-76e731553119",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "piercing",
			type: "resistance",
			value: 20,
		},
		{
			name: "piercing",
			type: "damage",
			value: 40,
		},
		{
			name: "hitChance",
			type: "auxiliaryStat",
			value: 2,
		},
	],
	characterClass: "-N_OzueqvUwAUNXnlWpb",
	type: "belt",
});
