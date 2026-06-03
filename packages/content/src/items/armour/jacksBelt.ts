import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "jacks_belt",
	name: "Jack's Belt",
	description: "Worn by versatile adventurers, this belt aids in mastering various skills.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-Nz9dCPBfsmrmF7finXd?alt=media&token=0ea47614-f283-40b1-a072-0d1c54a7e361",
	level: 4,
	price: 1600,
	armourType: "misc",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
		{
			name: "charisma",
			type: "stat",
			value: 2,
		},
	],
	type: "belt",
});
