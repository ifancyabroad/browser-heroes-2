import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "horned_mask",
	name: "Horned Mask",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsZwQhyR_-cJSJ0PqP?alt=media&token=92e11d40-2f98-47b5-823a-3df601f64fe5",
	level: 2,
	price: 330,
	armourType: "misc",
	properties: [
		{
			name: "constitution",
			type: "stat",
			value: 1,
		},
		{
			name: "crushing",
			type: "damage",
			value: 20,
		},
		{
			name: "armourClass",
			type: "auxiliaryStat",
			value: 1,
		},
	],
	type: "helmet",
});
