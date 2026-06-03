import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "knights_mail",
	name: "Knight's Mail",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8HsoUz7NkxyEkUN6c2?alt=media&token=ad65bca3-b84d-4219-9486-4f2f3e6b5e84",
	level: 4,
	price: 1560,
	armourClass: 15,
	armourType: "medium",
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
			name: "charisma",
			type: "stat",
			value: 2,
		},
		{
			name: "slashing",
			type: "damage",
			value: 20,
		},
	],
	type: "armour",
});
