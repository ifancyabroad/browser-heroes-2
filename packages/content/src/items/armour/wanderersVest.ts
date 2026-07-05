import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "wanderers_vest",
	name: "Wanderer's Vest",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8I79hlYuXK4jMUcNxa?alt=media&token=5ceb328d-9036-4b73-ad10-181cb099c749",
	price: 220,
	rarity: "uncommon",
	type: "armour",
	slot: "body",
	category: "medium",
	armourClass: 13,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "slashing",
			operation: "add",
			value: 20,
		},
		{
			type: "modifyStat",
			stat: "constitution",
			operation: "add",
			value: 1,
		},
	],
	tags: [],
});
