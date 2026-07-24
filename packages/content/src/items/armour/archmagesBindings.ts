import { buildArmour } from "../../builders/buildArmour";

export default buildArmour({
	id: "archmages_bindings",
	name: "Archmage's Bindings",
	description: "Crafted for the master of magic, these bracers enhance spell weaving.",
	icon: "items/armour/sets/cloth/Cloth17_bracers.png",
	price: 1600,
	rarity: "legendary",
	type: "armour",
	slot: "gloves",
	modifiers: [
		{
			type: "modifyStat",
			stat: "intelligence",
			value: 2,
		},
		{
			type: "modifyDamage",
			damageType: "fire",
			operation: "add",
			value: 40,
		},
		{
			type: "modifyDamageAffinity",
			affinity: "resistance",
			operation: "add",
			damageType: "fire",
		},
	],
	tags: [],
});
