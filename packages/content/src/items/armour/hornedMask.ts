import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "horned_mask",
	name: "Horned Mask",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsZwQhyR_-cJSJ0PqP?alt=media&token=92e11d40-2f98-47b5-823a-3df601f64fe5",
	price: 330,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 1,
		},
		{
			type: "modifyDamage",
			damageType: "crushing",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyStat",
			stat: "armourClass",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
