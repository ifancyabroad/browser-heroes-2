import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_plate",
	name: "Sunforged Plate",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGCEij6UUx69e-sTfO?alt=media&token=7fa124fa-c6ca-4e70-b2e4-ecaccc24e7cb",
	level: 4,
	price: 1800,
	armourClass: 18,
	armourType: "heavy",
	properties: [
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "wisdom",
			type: "stat",
			value: 2,
		},
		{
			name: "necrotic",
			type: "resistance",
			value: 40,
		},
	],
	characterClass: "-OI71oq4C31il2XnXrif",
	type: "armour",
});
