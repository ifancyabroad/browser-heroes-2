import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "shadow_armour",
	name: "Shadow Armour",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8DBv36AD0X67CEQK-t?alt=media&token=008c4fe4-745e-4df7-aeab-8b383d17b6fa",
	level: 3,
	price: 800,
	armourClass: 11,
	armourType: "light",
	properties: [
		{
			name: "dexterity",
			type: "stat",
			value: 2,
		},
		{
			name: "necrotic",
			type: "damage",
			value: 20,
		},
		{
			name: "slashing",
			type: "damage",
			value: 20,
		},
	],
	type: "armour",
});
