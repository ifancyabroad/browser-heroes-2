import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "crusaders_mail",
	name: "Crusader's Mail",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8HsQRUtV5enlZ3MShV?alt=media&token=66eb7b95-29a9-4b0d-a1e2-1f222cfdb9fd",
	level: 3,
	price: 620,
	armourClass: 14,
	armourType: "medium",
	properties: [
		{
			name: "necrotic",
			type: "resistance",
			value: 40,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
	],
	type: "armour",
});
