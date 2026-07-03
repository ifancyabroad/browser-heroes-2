import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "cold_mitts",
	name: "Cold Mitts",
	description: "Mitts that harness the power of ice, freezing foes on contact.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzDTAMUcHrAa-EWCFeo?alt=media&token=a7436878-28c1-4326-b133-c004c832c2d8",
	price: 290,
	rarity: "common",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "cold",
			operation: "add",
			value: 25,
		},
	],
	tags: [],
});
