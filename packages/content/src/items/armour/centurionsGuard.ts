import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "centurions_guard",
	name: "Centurion's Guard",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OIGHDP7d83u1taoV6xy?alt=media&token=0a842cf4-44a2-45d5-ad6f-2328253fc135",
	level: 4,
	price: 1700,
	armourType: "misc",
	properties: [
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
		{
			name: "strength",
			type: "stat",
			value: 2,
		},
		{
			name: "intelligence",
			type: "stat",
			value: 2,
		},
		{
			name: "constitution",
			type: "stat",
			value: 2,
		},
		{
			name: "fire",
			type: "resistance",
			value: 20,
		},
	],
	characterClass: "-OI74eayTZduv3tnmUwr",
	type: "helmet",
});
