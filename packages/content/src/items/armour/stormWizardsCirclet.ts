import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "storm_wizards_circlet",
	name: "Storm Wizard's Circlet",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OAsZTuo1olBNdnfJYWQ?alt=media&token=8d3c28ed-83f4-4113-b8bf-3a6c12cb4714",
	price: 290,
	rarity: "common",
	type: "armour",
	slot: "helmet",
	category: "accessory",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "lightning",
			operation: "add",
			value: 25,
		},
	],
	tags: [],
});
