import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "red_wizards_hood",
	name: "Red Wizard's Hood",
	description: "Circlet of Power that enhances magical abilities and focus.",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-NzELsGuv2GQ6PDoLFTQ?alt=media&token=93b5c0aa-0937-47b5-a95d-8828697758ef",
	price: 670,
	rarity: "rare",
	type: "armour",
	slot: "helmet",
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 25,
		},
		{
			type: "modifyStat",
			stat: "intelligence",
			operation: "add",
			value: 2,
		},
	],
	tags: [],
});
