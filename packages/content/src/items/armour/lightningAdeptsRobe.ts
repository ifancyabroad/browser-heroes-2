import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "lightning_adepts_robe",
	name: "Lightning Adept's Robe",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IBE_pHJnjHNYAUha-?alt=media&token=93035dd6-1659-45c8-9038-8f1479372b4f",
	level: 2,
	price: 300,
	armourClass: 10,
	armourType: "cloth",
	properties: [
		{
			name: "lightning",
			type: "damage",
			value: 20,
		},
		{
			name: "lightning",
			type: "resistance",
			value: 20,
		},
	],
	type: "armour",
});
