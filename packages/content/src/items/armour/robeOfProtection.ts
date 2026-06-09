import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "robe_of_protection",
	name: "Robe of Protection",
	icon: "https://firebasestorage.googleapis.com/v0/b/monster-manual.appspot.com/o/images%2Farmours%2F-OHy42jVE0Jqj3DYOJCU?alt=media&token=5dc705ba-abfc-47bd-a3f7-758ddb165a32",
	price: 1700,
	rarity: "common",
	type: "armour",
	slot: "body",
	category: "cloth",
	armourClass: 10,
	modifiers: [
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "slashing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "crushing",
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "piercing",
		},
	],
	tags: [],
});
