import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "sunforged_helm",
	name: "Sunforged Helm",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGCUUOa6_Tprk3nGmx?alt=media&token=b4121810-4a92-42a0-af51-e42eeff9a78d",
	level: 4,
	price: 1700,
	armourType: "misc",
	properties: [
		{
			name: "radiant",
			type: "damage",
			value: 40,
		},
		{
			name: "radiant",
			type: "resistance",
			value: 40,
		},
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 2,
		},
	],
	characterClass: "-OI71oq4C31il2XnXrif",
	type: "helmet",
});
