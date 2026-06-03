import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_the_lightbringer",
	name: "Robe of the Lightbringer",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHy3_9b1f9VotGKVTvF?alt=media&token=d3fb5491-5e1e-4da5-95c8-3609e209a2eb",
	level: 3,
	price: 780,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "radiant",
			type: "damage",
			value: 25,
		},
		{
			name: "necrotic",
			type: "resistance",
			value: 25,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
	],
	type: "armour",
});
