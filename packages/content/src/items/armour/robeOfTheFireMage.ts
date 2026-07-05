import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_the_fire_mage",
	name: "Robe of the Fire Mage",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-O8IAQSb0DFvLB-gVQ6K?alt=media&token=f336ccd2-9fab-4567-8907-ba1d360b4f28",
	price: 780,
	rarity: "rare",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 25,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
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
