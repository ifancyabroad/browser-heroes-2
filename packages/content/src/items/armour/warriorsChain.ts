import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "warriors_chain",
	name: "Warrior's Chain",
	description: "Adorned by champions, this chain represents victory and glory in combat.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9c8HKy-DBVWCITHWn?alt=media&token=40c07237-e892-4fb5-b217-afb551e5a4cd",
	level: 2,
	price: 220,
	armourType: "misc",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: -2,
		},
		{
			name: "strength",
			type: "stat",
			value: 4,
		},
	],
	type: "belt",
});
