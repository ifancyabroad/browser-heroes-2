import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archers_vest",
	name: "Archer's Vest",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8D9MKSCaY6F_NwQSzW?alt=media&token=0545e274-4fef-427f-8d9a-9a568fe9f507",
	level: 2,
	price: 290,
	armourClass: 10,
	armourType: "light",
	properties: [
		{
			name: "piercing",
			type: "damage",
			value: 25,
		},
	],
	type: "armour",
});
