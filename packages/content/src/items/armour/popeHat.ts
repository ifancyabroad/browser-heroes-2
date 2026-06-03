import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "pope_hat",
	name: "Pope Hat",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHsFJLKzc9OamfD8D8v?alt=media&token=c7e3e234-30d8-4083-adea-8b965844b0ad",
	level: 3,
	price: 720,
	armourType: "misc",
	properties: [
		{
			name: "radiant",
			type: "damage",
			value: 40,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
	],
	type: "helmet",
});
