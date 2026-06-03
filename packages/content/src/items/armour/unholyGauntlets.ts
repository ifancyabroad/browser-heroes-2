import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "unholy_gauntlets",
	name: "Unholy Gauntlets",
	description: "Wreathed in darkness, these gauntlets embody the essence of the shadow.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDTm9T7VzIuKsvXgM6?alt=media&token=1fd3056f-d5b4-4296-9258-91b4070ac56f",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "hitChance",
			type: "auxiliaryStat",
			value: 4,
		},
		{
			name: "slashing",
			type: "damage",
			value: 40,
		},
	],
	characterClass: "-N_Ot99GWjYjrv9Gs-fP",
	type: "gloves",
});
